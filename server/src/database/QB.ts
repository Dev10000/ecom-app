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
type QueryType = 'select' | 'count' | 'delete' | 'insert';

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

interface IQueryOptions {
    limit: number;
    select: string[] | '*';
    orderBy: IOrderBy;
    conditions: ICondition[];
    nullConditions: INullCondition[];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function QB<T>(model: Constructor<T>) {
    class QB {
        data: IQueryOptions = {
            limit: 0,
            select: '*',
            orderBy: { field: '', direction: 'asc' },
            conditions: [],
            nullConditions: [],
        };

        constructor(private Model: Constructor<T>) {
            this.Model = Model;
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
         * @param action [OPTIONAL] 'select' | 'count' | 'delete' | 'insert'
         */
        query(table: string, action?: QueryType): QueryConfig {
            const prefix = this.buildPrefix(action || 'select');
            const text = `${prefix} ${table} ${this.buildConditions()} ${this.buildOrderBy()}${this.buildLimit()}`;
            const values = this.buildValues();

            return { text, values };
        }

        /**
         * Get a list of resources from the database, for the given query.
         */
        async get(): Promise<T[]> {
            const newModel: T & IModel = new this.Model();
            const { table } = newModel;
            const { rows } = await DB.query(this.query(table));
            return rows;
        }

        /**
         * Get one record from the database and create a new instance of the model with the data.
         */
        async first(): Promise<T> {
            this.data.limit = 1;
            const newModel: T & IModel = new this.Model();
            const { table } = newModel;
            const { rows } = await DB.query(this.query(table));
            Object.assign(newModel, rows[0]);
            return newModel;
        }

        /**
         * Delete a record from the database.
         */
        async delete(): Promise<void> {
            const newModel: T & IModel = new this.Model();
            const { table } = newModel;
            await DB.query(this.query(table, 'delete'));
        }

        /**
         * Get the number of rows from the database, for the given query.
         */
        async count(): Promise<number> {
            const newModel: T & IModel = new this.Model();
            const { table } = newModel;
            const { rows } = await DB.query(this.query(table, 'count'));
            return rows[0].count;
        }

        //  ------------ start  to ---- be ----deleted ------

        // async updateOrInsert(model: T & IModel): Promise<T> {
        //     let updateOrInsert: 'update' | 'insert';
        //     if (model.id) {
        //         updateOrInsert = 'update';
        //     } else {
        //         updateOrInsert = 'insert';
        //     }

        //     console.log('I will do an: ', updateOrInsert);
        //     const instance = await new this.Model();
        //     console.log({ instance });

        //     return instance;
        // }

        //  ------------ end to ---- be ----deleted ------

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
                case 'insert':
                    return `INSERT INTO`;
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
                    (acc += ` ${index ? 'AND' : 'WHERE'} ${where.field} ${where.operator} $${index + 1}`),
                '',
            );

            const nullConditions = this.data.nullConditions.reduce(
                (acc, where, index) =>
                    (acc += ` ${index === 0 && this.data.conditions.length === 0 ? 'WHERE' : 'AND'} ${where.field} ${
                        where.is_null ? 'IS NULL' : 'IS NOT NULL'
                    }`),
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
    }

    return new QB(model);
}

// Model.ts
abstract class Model<T> {
    /**
     * This is by default the primary key
     * for each model extending the Model class
     * TODO: Try to find a more generic aproach to handle exceptions
     */
    id?: number;

    /**
     * Default table name. This can be overwritten in class definition
     * By default it's the camel case pluralized version of the Model class
     * eq. ProductCategory -> product_categories
     */
    readonly table = pluralize(this.constructor.name.split(/(?=[A-Z])/).join('_')).toLowerCase();

    /**
     * An array of fields that should be hidden for the current model.
     * This should be added to the model where appropriate.
     */
    readonly hidden: string[] = [];

    /**
     * This includes a list of properties specific to the abstract class.
     * Sould not be added or overwritten in the class that extends Model.
     * TODO: find a way to prevent this (so that typescript is still happy)
     */
    readonly internal: (keyof this)[] = ['table', 'hidden', 'internal'];

    static instantiable() {
        return `${this.name}`;
    }

    async save() {
        let text;

        const { table } = this;
        const object = removeFields(this, [...this.internal]);
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
        return DB.query(query).then((response) => response.rows[0] as T);
    }

    create(props: T) {
        Object.assign(this, props);
        return this;
    }

    /**
     * This will return the object without the internal and hidden fields.
     */
    toJSON(): Pick<this, Exclude<keyof this, keyof this>> {
        const removable = [...this.internal, ...this.hidden];
        return removeFields(this, (removable as unknown) as (keyof this)[]);
    }
}

// models/User.ts
class User extends Model<IUser> {
    readonly hidden = ['password'];
}

// constructor usage
const user1 = QB<IUser>(User).where('id', '>', '111').limit(5).whereNotNull('country_id').orderBy('first_name').first();

user1.then((user) => {
    console.log({ user });
    user.email = 'test@email.com';
    console.log(
        user.save().then((updatedUser) => {
            console.log({ updatedUser });
        }),
    );
});
