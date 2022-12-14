/* eslint-disable new-cap */
/* eslint-disable no-shadow */
// www.typescriptlang.org/docs/handbook/mixins.html

import { QueryConfig } from 'pg';
import pluralize from 'pluralize';
import DB from '../config/database';
import { pascalToSnakeCase } from './utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function QueryBuilder<T>(model: Constructor<T>) {
    interface IJoin {
        table: string;
        localField: keyof T;
        remoteField: string;
    }

    interface IQueryOptions {
        table: string;
        limit: number;
        paginate: { page: number; limit: number };
        select: string[] | '*';
        orderBy: IOrderBy;
        conditions: ICondition[];
        nullConditions: INullCondition[];
        orConditions: ICondition[];
        orNullConditions: INullCondition[];
        joins: IJoin[];
        with: IWith[];
    }

    class QB {
        data: IQueryOptions = {
            table: '',
            limit: 0,
            paginate: { page: 1, limit: 1 },
            select: '*',
            orderBy: { field: '', direction: 'asc' },
            conditions: [],
            nullConditions: [],
            orConditions: [],
            orNullConditions: [],
            joins: [],
            with: [],
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
        orWhere(field: string, operatorOrValue: ConditionValue | ConditionOperator, value?: ConditionValue): this {
            if (value) {
                this.data.orConditions.push({ field, operator: operatorOrValue, value });
            } else {
                this.data.orConditions.push({ field, operator: '=', value: operatorOrValue });
            }
            return this;
        }

        /**
         * Ads a new WHERE NULL condition on the query string.
         * @param field string
         */
        orWhereNull(field: string): this {
            this.data.orNullConditions.push({ field, is_null: true });
            return this;
        }

        /**
         * Ads a new WHERE NOT NULL condition on the query string.
         * @param field string
         */
        orWhereNotNull(field: string): this {
            this.data.orNullConditions.push({ field, is_null: false });
            return this;
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
         * Paginate the query results.
         * @param page number
         * @param limit number
         */
        paginate(page: number, limit: number): this {
            this.data.paginate = { page, limit };
            // console.log(this);
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

        // with(...relationships: (keyof T)[]): this {
        with(...relationships: string[]): this {
            const model = new this.Model();
            const { belongsTo, hasMany } = model;

            const definedRelationships: IWith[] = [];

            belongsTo.forEach((belongsToItem) => {
                definedRelationships.push({
                    name: belongsToItem.name || pascalToSnakeCase(belongsToItem.model.name),
                    type: 'belongsTo',
                    model: belongsToItem.model,
                    table: new belongsToItem.model().table,
                    localField:
                        (belongsToItem.localField as keyof T) ||
                        (`${pascalToSnakeCase(belongsToItem.model.name)}_id` as keyof T),
                    remoteField: belongsToItem.remoteField || 'id',
                });
            });

            hasMany.forEach((hasManyItem) => {
                definedRelationships.push({
                    name: hasManyItem.name || pluralize(pascalToSnakeCase(hasManyItem.model.name)),
                    type: 'hasMany',
                    model: hasManyItem.model,
                    table: new hasManyItem.model().table,
                    localField: (hasManyItem.localField as keyof T) || (`id` as keyof T),
                    remoteField: hasManyItem.remoteField || `${pascalToSnakeCase(model.constructor.name)}_id`,
                });
            });

            const eagerLoad = definedRelationships.filter((definedRelationship) =>
                relationships.includes(definedRelationship.name),
            );
            this.data.with.push(...eagerLoad);
            return this;
        }

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

            table = this.buildWiths() || table;

            const text = `${prefix} ${table} ${this.buildJoins()} ${this.buildConditions()} ${this.buildOrConditions()} ${this.buildOrderBy()}${this.buildPagination()}${this.buildLimit()}`;
            const values = this.buildValues();
            console.log(text, values);
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

        async delete(): Promise<boolean> {
            try {
                const res = await DB.query(this.query(this.data.table, 'delete'));
                if (res.rowCount > 0) return true;
                return false;
            } catch (error) {
                console.log(error);
                return false;
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
            const values = this.data.conditions.map((where) => where.value);
            const orValues = this.data.orConditions.map((where) => where.value);
            const offset = (this.data.paginate.page - 1) * this.data.paginate.limit;

            return this.data.paginate.limit === 1
                ? [...values, ...orValues]
                : [...values, ...orValues, this.data.paginate.limit, offset];
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
         * Builds the WHERE, WHERE NULL and WHERE NOT NULL part of the query.
         */
        private buildOrConditions(): string {
            const prefix = this.data.conditions.length || this.data.nullConditions.length ? 'AND (' : 'WHERE (';

            const conditions = this.data.orConditions.reduce(
                (acc, where, index) =>
                    (acc += ` ${index ? 'OR' : ''} ${this.data.table}.${where.field} ${where.operator} $${
                        index + this.data.conditions.length + 1
                    }`),
                '',
            );

            const nullConditions = this.data.orNullConditions.reduce(
                (acc, where, index) =>
                    (acc += ` ${index === 0 && this.data.orConditions.length === 0 ? '' : 'OR'} ${this.data.table}.${
                        where.field
                    } ${where.is_null ? 'IS NULL' : 'IS NOT NULL'}`),
                '',
            );

            const postfix = ')';

            return this.data.orConditions.length || this.data.orNullConditions.length
                ? `${prefix}${conditions}${nullConditions}${postfix}`
                : '';
        }

        /**
         * Builds the LIMIT part of the query.
         */
        private buildLimit(): string {
            return this.data.limit ? ` LIMIT ${this.data.limit}` : '';
        }

        /**
         * Builds the LIMIT and OFFSET part of the query for pagination.
         */
        private buildPagination(): string {
            this.data.limit = 0;
            return this.data.paginate.limit === 1
                ? ''
                : ` LIMIT $${this.data.conditions.length + this.data.orConditions.length + 1} OFFSET $${
                      this.data.conditions.length + this.data.orConditions.length + 2
                  }`;
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

        private buildWiths(): string {
            if (this.data.with.length) {
                let withs = `(${this.data.table}`;
                this.data.with.forEach((eager, index) => {
                    withs += ` ${eager.type === 'hasMany' ? 'LEFT' : ''} JOIN ( SELECT json_agg(${eager.table}.*) AS ${
                        eager.name
                    },
                            ${eager.table}.${eager.remoteField}
                              FROM ${eager.table}
                             GROUP BY ${eager.table}.${eager.remoteField}) agg${index} ON ((${this.data.table}.${String(
                        eager.localField,
                    )} = agg${index}.${eager.remoteField}))`;
                });

                return `${withs})`;
            }
            return '';
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

// QueryBuilder<IUserModel>(User)
//     .where('id', '=', '777')
//     .first()
//     .then((user) => {
//         console.log(user.toJSON());
//         user.country()
//             .then((country) => console.log({ country }))
//             .catch((err) => console.log({ err }));
//     })
//     .catch((err) => console.log({ err }));

// QueryBuilder<IUserModel>(User).with('country').where('id', '=', '777').first();
