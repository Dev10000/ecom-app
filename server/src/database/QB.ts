/* eslint-disable no-shadow */
// www.typescriptlang.org/docs/handbook/mixins.html

import { QueryConfig } from 'pg';
import { StringDecoder } from 'string_decoder';
import DB from '../config/database';

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

        // ORIGINAL
        // async delete(): Promise<void> {
        //     await DB.query(this.query(this.data.table, 'delete'));
        // }

        // NEW
        async delete(): Promise<any> {
            try {
                let status: string;
                const res = await DB.query(this.query(this.data.table, 'delete'));

                if (res.rowCount > 0) {
                    status = 'success';
                } else status = 'unsuccessful';

                console.log(res);

                return {
                    status,
                    command: res.command,
                    count: res.rowCount,
                    value: this.query(this.data.table).values,
                    queryname: this.query(this.data.table).name,
                    querytext: this.query(this.data.table).text,
                };
                // V1 return `${res.command}: ${res.rowCount} - Query: ${JSON.stringify(this.query(this.data.table))} `;
                // V2 return `${res.command}: ${res.rowCount} - Values: ${this.query(this.data.table).values} - Name: ${
                // this.query(this.data.table).name} - Text: ${this.query(this.data.table).text} `;
            } catch (err) {
                console.log(err);
                return Promise.reject(new Error(`DB Error ${err.message} ${err.stack}`));
            }
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

// constructor usage examples
// I need to implement in controllers: youtu.be/9Swrzqr4MSs?t=1647 or Partial<T>
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

// QB<IUserModel>(User)
//     .where('id', '=', '777')
//     .first()
//     .then((user) => {
//         console.log(user.toJSON());
//         user.country()
//             .then((country) => console.log({ country }))
//             .catch((err) => console.log({ err }));
//     })
//     .catch((err) => console.log({ err }));
