/* eslint-disable no-sequences */
/* eslint-disable no-shadow */
/* eslint-disable max-classes-per-file */
// www.typescriptlang.org/docs/handbook/mixins.html

import pluralize from 'pluralize';
import { QueryConfig } from 'pg';
import DB from '../config/database';

// helpers.ts
export const removeFields = <T, K extends keyof T>(entity: T, props: K[]): Omit<T, K> => {
    return props.reduce((s, prop) => (delete s[prop], s), entity);
};

// QB.ts

const operators = ['=', '>', '<', '>=', '<=', '<>', '!=', 'LIKE'] as const;

type ConditionOperator = typeof operators[number];
type ConditionValue = string | number | boolean;
type SortDirection = 'asc' | 'desc';
type Constructor<T> = new () => T & IModel;
type QueryType = 'select' | 'count' | 'delete';

interface ICondition {
    field: string;
    operator?: ConditionOperator | ConditionValue;
    value: ConditionValue;
}

interface INullCondition {
    field: string;
    is_null: boolean;
}

interface IOrderBy {
    field: string;
    direction: SortDirection;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function QB<T>(model: Constructor<T>) {
    interface IJoin {
        table: string;
        localField: keyof T;
        remoteField: string;
    }

    interface IQueryOptions {
        table: string;
        limit: number;
        select: string[] | '*';
        orderBy: IOrderBy;
        conditions: ICondition[];
        nullConditions: INullCondition[];
        joins: IJoin[];
    }

    class QB {
        data: IQueryOptions = {
            table: '',
            limit: 0,
            select: '*',
            orderBy: { field: '', direction: 'asc' },
            conditions: [],
            nullConditions: [],
            joins: [],
        };

        constructor(private Model: Constructor<T>) {
            this.Model = Model;
            this.data.table = new this.Model().table;
        }

        /**
         * Ads a new WHERE condition on the query string.
         * where('field', 'value') , this way the operator is implicitly '='
         * where('field', 'operator', 'value')
         *
         * @param field string
         * @param operatorOrValue [OPTIONAL] "=" | ">" | "<" | ">=" | "<=" | "<>" | "!=" | 'LIKE'
         * @param value string | number | boolean
         */
        where(field: string, operatorOrValue: ConditionValue | ConditionOperator, value?: ConditionValue): this {
            if (value) {
                this.data.conditions.push({ field, operator: operatorOrValue, value });
            } else {
                this.data.conditions.push({ field, operator: '=', value: operatorOrValue });
            }
            return this;
        }

        /**
         * Ads a new WHERE NULL condition on the query string.
         * @param field string
         */
        whereNull(field: string): this {
            this.data.nullConditions.push({ field, is_null: true });
            return this;
        }

        /**
         * Ads a new WHERE NOT NULL condition on the query string.
         * @param field string
         */
        whereNotNull(field: string): this {
            this.data.nullConditions.push({ field, is_null: false });
            return this;
        }

        /**
         * Limit the number of results to get back from the query.
         * @param limit number
         */
        limit(limit: number): this {
            this.data.limit = limit;
            return this;
        }

        /**
         * Used to specify the fields we want to retrieve from the query. Default is '*'
         * @param args string[]
         */
        select(...args: string[]): this {
            this.data.select = args;
            return this;
        }

        // Need to filter only relevant methods to make this work!!!
        // ...then, use something like a Proxy()
        // Kept here for when I'll be able to fill the blanks.
        // Until then, I'll try a join approach
        // with(...relationships: (keyof T)[]): this {
        //     const model: T = new this.Model();
        //     console.log(Object.keys(model));
        //     console.log({ relationships });
        //     this.data.relationships = relationships.map((relationship) => model[relationship]();
        //     return this;
        // }

        /**
         * Ads a join part to the built query.
         * The type of join is INNER JOIN
         * @param table name of the table to be joined ex. 'countries'
         * @param localField the local field ex. 'country_id'
         * @param remoteField the remote field ex. 'id'
         */
        join(table: string, localField: keyof T, remoteField: string): this {
            this.data.joins.push({
                table,
                localField,
                remoteField,
            });
            return this;
        }

        /**
         * Used for sorting the queried data. Direction can be omited. The default is 'asc'.
         * @param field string
         * @param direction [OPTIONAL] 'asc' | 'desc'
         */
        orderBy(field: string, direction?: SortDirection): this {
            if (!direction) {
                direction = 'asc';
            }
            this.data.orderBy = { field, direction };
            return this;
        }

        /**
         * Builds up the query on the given table.
         * Default acion is 'select'.
         * @param table table where the query should run
         * @param action [OPTIONAL] 'select' | 'count' | 'delete'
         */
        query(table: string, action?: QueryType): QueryConfig {
            const prefix = this.buildPrefix(action || 'select');
            const text = `${prefix} ${table} ${this.buildJoins()} ${this.buildConditions()} ${this.buildOrderBy()}${this.buildLimit()}`;
            const values = this.buildValues();
            // console.log(text, values);
            return { text, values };
        }

        /**
         * Get a list of resources from the database, for the given query.
         */
        async get(): Promise<T[]> {
            const { rows } = await DB.query(this.query(this.data.table));
            return rows;
        }

        /**
         * Get one record from the database and create a new instance of the model with the data.
         */
        async first(): Promise<T> {
            this.data.limit = 1;
            const newModel: T = new this.Model();
            const { rows } = await DB.query(this.query(this.data.table));
            Object.assign(newModel, rows[0]);
            return newModel;
        }

        /**
         * Delete a record from the database.
         */
        async delete(): Promise<void> {
            await DB.query(this.query(this.data.table, 'delete'));
        }

        /**
         * Get the number of rows from the database, for the given query.
         */
        async count(): Promise<number> {
            const { rows } = await DB.query(this.query(this.data.table, 'count'));
            return rows[0].count;
        }

        /* ---- only internal stuff below this like ---- */

        /**
         * Builds the first part of the query.
         * @param action
         */
        private buildPrefix(action: QueryType): string {
            switch (action) {
                case 'select':
                    return `SELECT ${this.data.select} FROM`;
                case 'count':
                    return `SELECT COUNT(${this.data.select}) FROM`;
                case 'delete':
                    // TODO: if (useSoftDeletes) ... this should be turned into an update statement where deleted_at = new Date();
                    return `DELETE FROM`;
                default:
                    throw new Error(`ERROR: action ${action} not implemented!`);
            }
        }

        /**
         * Builds an array of values to be passed with the query.
         */
        private buildValues(): ConditionValue[] {
            return this.data.conditions.map((where) => where.value);
        }

        /**
         * Builds the WHERE, WHERE NULL and WHERE NOT NULL part of the query.
         */
        private buildConditions(): string {
            const conditions = this.data.conditions.reduce(
                (acc, where, index) =>
                    (acc += ` ${index ? 'AND' : 'WHERE'} ${this.data.table}.${where.field} ${where.operator} $${
                        index + 1
                    }`),
                '',
            );

            const nullConditions = this.data.nullConditions.reduce(
                (acc, where, index) =>
                    (acc += ` ${index === 0 && this.data.conditions.length === 0 ? 'WHERE' : 'AND'} ${
                        this.data.table
                    }.${where.field} ${where.is_null ? 'IS NULL' : 'IS NOT NULL'}`),
                '',
            );

            return `${conditions}${nullConditions}`;
        }

        /**
         * Builds the LIMIT part of the query.
         */
        private buildLimit(): string {
            return this.data.limit ? ` LIMIT ${this.data.limit}` : '';
        }

        /**
         * Builds the ORDER BY part of the query.
         */
        private buildOrderBy(): string {
            return this.data.orderBy.field ? ` ORDER BY ${this.data.orderBy.field} ${this.data.orderBy.direction}` : '';
        }

        /**
         * Builds the JOIN [table] ON [condition] part of the query.
         * The type of join is INNER JOIN
         */
        private buildJoins(): string[] {
            return this.data.joins.map(
                (join) =>
                    ` INNER JOIN ${join.table} ON ${this.data.table}.${join.localField} = ${join.table}.${join.remoteField}`,
            );
        }
    }

    return new QB(model);
}

// Model.ts
class Model<T> {
    // abstract?
    /**
     * This is by default the primary key
     * for each model extending the Model class
     * TODO: Try to find a more generic aproach to handle exceptions
     */
    id?: number;

    /**
     * Default table name. This can be overwritten in class definition
     * By default it's the camel case pluralized version of the Model class
     * ex. ProductCategory -> product_categories
     */
    readonly table = pluralize(this.constructor.name.split(/(?=[A-Z])/).join('_')).toLowerCase();

    /**
     * An array of fields that should be hidden for the current model.
     * This should be added to the model where appropriate.
     */
    readonly hidden: string[] = [];

    /**
     * Saves the current state of the object into the database.g
     */
    async save() {
        let text;

        const { table } = this;
        const object = removeFields(this, ['table', 'hidden']);
        const keys = Object.keys(object);
        const values = Object.values(object);
        const valueRefs = values.map((_value, index) => `$${index + 1}`);

        // need to handle here created_at & updated_at

        if (this.id) {
            text = `UPDATE ${table} SET (${keys}) = (${valueRefs}) WHERE id=${this.id} RETURNING *;`;
        } else {
            text = `INSERT INTO ${table} (${keys}) VALUES (${valueRefs}) RETURNING *;`;
        }

        const query = { text, values };
        // console.log(query);
        return DB.query(query).then((response) => response.rows[0] as T);
    }

    // static create(props: T) {
    //     Object.assign(this, props);
    //     return this;
    // }

    /**
     * Finds a record by the ID and returns a promise of an instance.
     * @param id
     */
    static async find<U>(id: number): Promise<U> {
        const instance = new this<U>();
        const text = `SELECT * FROM ${instance.table} WHERE id=$1 LIMIT 1;`;
        const values = [id];
        const query = { text, values };
        return DB.query(query).then((response) => {
            Object.assign(instance, response.rows[0]);
            return (instance as unknown) as U;
        });
    }

    /**
     * This will return the object without the internal and hidden fields.
     */
    toJSON(): Pick<this, Exclude<keyof this, keyof this>> {
        const removable = ['table', 'hidden', ...this.hidden];
        return removeFields(this, (removable as unknown) as (keyof this)[]);
    }

    /**
     * BelongsTo Model relationship
     * @param otherModel Other Model Name. ex. Country
     * @param localField [OPTIONAL] ex. country_id | Defaults to the lowercase version of the other model + '_id'
     * @param remoteField [OPTIONAL] ex. id | Defaults to 'id'
     */
    belongsTo<U>(otherModel: Constructor<U>, localField?: string, remoteField?: string): Promise<U> {
        const localFieldKey = (localField as keyof this) || (`${otherModel.name.toLowerCase()}_id` as keyof this); // Country -> country_id
        remoteField = remoteField || `id`; // default field name is 'id' unless specfied otherwise
        const conditionValue = (this[localFieldKey] as unknown) as ConditionValue;
        return QB<U>(otherModel).where(remoteField, conditionValue).first();
    }

    /**
     * hasMany Model relationship
     * @param otherModel Other Model Name. ex. User
     * @param localField [OPTIONAL] ex. id | Defaults to 'id'
     * @param remoteField [OPTIONAL] ex. country_id | Defaults to the lowercase version of this model + '_id'
     */
    hasMany<U>(otherModel: Constructor<U>, localField?: string, remoteField?: string): Promise<U[]> {
        const localFieldKey = (localField as keyof this) || (`id` as keyof this); // default field name is 'id' unless specfied otherwise
        remoteField = remoteField || `${this.constructor.name.toLowerCase()}_id`; // User -> users_id
        const conditionValue = (this[localFieldKey] as unknown) as ConditionValue;
        return QB<U>(otherModel).where(remoteField, conditionValue).get();
    }
}

// models/Country.ts
class Country extends Model<ICountry> {
    async users(): Promise<IUser[]> {
        // eslint-disable-next-line no-use-before-define
        return this.hasMany(User);
    }
}

// models/User.ts
class User extends Model<IUser> {
    readonly hidden = ['password'];

    country(): Promise<ICountryModel> {
        return this.belongsTo(Country);
    }
}

// constructor usage
// youtu.be/9Swrzqr4MSs?t=1647
// req.body as {[P in keyof IUser]? : IUser[P] extends Function ? never: IUser[P]}

// const user1 = QB<IUserModel>(User)
//     .select('users.*', 'countries.name as country_name')
//     .join('countries', 'country_id', 'id')
//     .where('id', '=', '555')
//     .first();

// user1.then((user) => {
//     console.log({ user });
//     user.email = 'test1@email.com';
//     console.log(
//         user
//             .save()
//             .then((updatedUser) => {
//                 console.log({ updatedUser });
//             })
//             .catch((err) => console.log('352', err.message)),
//     );
// });

// User.find<IUser>(333)
//     .then((user) => console.log(user))
//     .catch((err) => console.log(err.message));

QB<IUserModel>(User)
    .where('id', '=', '777')
    .first()
    .then((user) => {
        console.log(user.toJSON());
        user.country()
            .then((country) => console.log({ country }))
            .catch((err) => console.log({ err }));
    })
    .catch((err) => console.log({ err }));
