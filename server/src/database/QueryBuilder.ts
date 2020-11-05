/* eslint-disable new-cap */
import { QueryConfig } from 'pg';
import DB from '../config/database';

// https://stackoverflow.com/questions/59857223/how-to-convert-typescript-types-of-strings-to-array-of-strings
const operators = ['=', '>', '<', '>=', '<=', '<>', '!=', 'LIKE'] as const;
type Operator = typeof operators[number];

type Value = string | number | boolean;

type SortDirection = 'asc' | 'desc';

interface ICondition {
    field: string;
    operator?: Operator | Value;
    value: Value;
}

interface INullCondition {
    field: string;
    is_null: boolean;
}

interface IOrderBy {
    field: string;
    direction: SortDirection;
}

interface hasModelProperties {
    table?: string;
    hidden?: string[];
    useSoftDeletes?: boolean;
}

interface IOptions {
    action: 'select' | 'count' | 'delete' | 'create';
    limit: number;
    select: string[] | '*';
    orderBy: IOrderBy;
    conditions: ICondition[];
    nullConditions: INullCondition[];
}

// type Class<T> = T & hasModelProperties;
type Constructable<T> = new () => T & hasModelProperties;

export default class QueryBuilder<T> {
    options: IOptions = {
        action: 'select',
        limit: 0,
        select: '*',
        orderBy: { field: '', direction: 'asc' },
        conditions: [],
        nullConditions: [],
    };

    constructor(private model: Constructable<T>) {
        this.model = model;
    }

    /**
     * Optional. Usage:
     * where('field', 'value') , this way the operator is implicitly '='
     * where('field', 'operator', 'value')
     *
     * @param field string
     * @param operatorOrValue "=" | ">" | "<" | ">=" | "<=" | "<>" | "!=" | 'LIKE'
     * @param value string | number | boolean
     */
    where(field: string, operatorOrValue: Value | Operator, value?: Value): this {
        if (value) {
            this.options.conditions.push({ field, operator: operatorOrValue, value });
        } else {
            this.options.conditions.push({ field, operator: '=', value: operatorOrValue });
        }
        return this;
    }

    /**
     * Optional.
     * @param field string
     */
    whereNull(field: string): this {
        this.options.nullConditions.push({ field, is_null: true });
        return this;
    }

    /**
     * Optional.
     * @param field string
     */
    whereNotNull(field: string): this {
        this.options.nullConditions.push({ field, is_null: false });
        return this;
    }

    /**
     * Optional.
     * @param limit number
     */
    limit(limit: number): this {
        this.options.limit = limit;
        return this;
    }

    /**
     * Optional. Default is '*'
     * @param args string[]
     */
    select(...args: string[]): this {
        this.options.select = args;
        return this;
    }

    /**
     * Optional
     * @param field string
     * @param direction 'asc' | 'desc'
     */
    orderBy(field: string, direction: SortDirection = 'asc'): this {
        this.options.orderBy = { field, direction };
        return this;
    }

    /**
     * This is the place where the query actually gets created based on the cumulated input parameters
     */
    sql(): QueryConfig {
        const { table } = new this.model();

        const conditions = this.options.conditions.reduce(
            (acc, where, index) =>
                (acc += ` ${index ? 'AND' : 'WHERE'} ${where.field} ${where.operator} $${index + 1}`),
            '',
        );

        const nullConditions = this.options.nullConditions.reduce(
            (acc, where, index) =>
                (acc += ` ${index === 0 && this.options.conditions.length === 0 ? 'WHERE' : 'AND'} ${where.field} ${
                    where.is_null ? 'IS NULL' : 'IS NOT NULL'
                }`),
            '',
        );

        let prefix;
        switch (this.options.action) {
            case 'select':
                prefix = `SELECT ${this.options.select} FROM ${table}`;
                break;
            case 'count':
                prefix = `SELECT COUNT(${this.options.select}) FROM ${table}`;
                break;
            case 'create':
                prefix = `INSERT INTO ${table} `;
                break;
            case 'delete':
                // TODO: if (useSoftDeletes) ... this should be turned into an update statement where deleted_at = new Date();
                prefix = `DELETE FROM ${table}`;
                break;
            default:
                throw new Error('Unknown action!');
        }

        const limit = this.options.limit ? ` LIMIT ${this.options.limit}` : '';
        const values = this.options.conditions.map((where) => where.value);
        const order = this.options.orderBy.field
            ? ` ORDER BY ${this.options.orderBy.field} ${this.options.orderBy.direction}`
            : '';

        const query: QueryConfig = {
            text: `${prefix}${conditions}${nullConditions} ${order}${limit}`,
            values,
        };

        return query;
    }

    /**
     * This is returning the query result rows.
     */
    async get(): Promise<T[]> {
        const { rows } = await DB.query(this.sql());
        // console.log(rows);
        return rows;
    }

    /**
     * This returns the number of results for the given query.
     */
    async count(): Promise<number> {
        this.options.action = 'count';
        this.options.orderBy = { field: '', direction: 'asc' };
        const { rows } = await DB.query(this.sql());
        return rows[0].count;
    }

    /**
     * This sets the query LIMIT to 1 and calls get method.
     */
    async first(): Promise<T> {
        this.options.limit = 1;
        const { rows } = await DB.query(this.sql());
        const instance = new this.model();
        const filtered = rows[0]; // need to exclude the hidden fields here
        Object.assign(instance, filtered);
        console.log(instance);
        return instance;
    }

    /**
     * Used to delete one or multiple rows.
     */
    async delete(): Promise<void> {
        this.options.action = 'delete';
        await DB.query(this.sql());
    }

    // firstOrCreate(): Promise<T> {}
    // orWhere ...
    // create -> creates a new instance
    // save -> persist the instance to the database (used also for making updates)
}
