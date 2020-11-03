/* eslint-disable max-classes-per-file */
import { QueryConfig } from 'pg';
import pluralize from 'pluralize';
import DB from '../config/database';

// https://stackoverflow.com/questions/59857223/how-to-convert-typescript-types-of-strings-to-array-of-strings
const operators = ['=', '>', '<', '>=', '<=', '<>', '!='] as const;
type Operator = typeof operators[number];

type Value = string | number | boolean;

type SortDirection = 'asc' | 'desc';

interface ICondition {
    field: string;
    operator?: Operator | Value;
    value: Value;
}

interface IOrderBy {
    field: string;
    direction: SortDirection;
}

export default class BaseModel<T> {
    protected table = this.predefinedTableName();

    protected querySelect: string[] | string = '*';

    protected queryConditions: ICondition[] = [];

    protected queryLimit = 0;

    protected queryOrderBy: IOrderBy = { field: '', direction: 'asc' };

    // protected hidden = [];

    private predefinedTableName(): string {
        // https://stackoverflow.com/questions/30521224/javascript-convert-pascalcase-to-underscore-case
        return pluralize(this.constructor.name.split(/(?=[A-Z])/).join('_')).toLowerCase();
    }

    // public reset(): this {
    //     this.querySelect = '*';
    //     this.queryConditions = [];
    //     this.queryLimit = 0;
    //     this.queryOrderBy = { field: '', direction: 'asc' };

    //     return this;
    // }

    /**
     * Optional. Usage:
     * where('field', 'value') , this way the operator is implicitly '='
     * where('field', 'operator', 'value')
     *
     * @param field string
     * @param operatorOrValue "=" | ">" | "<" | ">=" | "<=" | "<>" | "!="
     * @param value string | number | boolean
     */
    public where(field: string, operatorOrValue: Value | Operator, value?: Value): this {
        if (value) {
            this.queryConditions.push({ field, operator: operatorOrValue, value });
        } else {
            this.queryConditions.push({ field, operator: '=', value: operatorOrValue });
        }
        return this;
    }

    /**
     * Optional.
     * @param limit number
     */
    public limit(limit?: number): this {
        this.queryLimit = limit || 0;
        return this;
    }

    /**
     * Optional. Default is '*'
     * @param args string[]
     */
    public select(...args: string[]): this {
        this.querySelect = args;
        return this;
    }

    /**
     * Optional
     * @param field string
     * @param direction 'asc' | 'desc'
     */
    public orderBy(field: string, direction: SortDirection = 'asc'): this {
        this.queryOrderBy = { field, direction };
        return this;
    }

    /**
     * This is where we build up the query object.
     */
    public sql(): QueryConfig {
        console.log(this);
        const conditions = this.queryConditions.reduce(
            (acc, where, index) =>
                (acc +=
                    index === 0
                        ? ` WHERE ${where.field} ${where.operator} $${index + 1}`
                        : ` AND ${where.field} ${where.operator} $${index + 1}`),
            '',
        );

        const limit = this.queryLimit ? ` LIMIT ${this.queryLimit}` : '';
        const values = this.queryConditions.map((where) => where.value);
        const order = this.queryOrderBy.field
            ? ` ORDER BY ${this.queryOrderBy.field} ${this.queryOrderBy.direction}`
            : '';

        const query: QueryConfig = {
            text: `SELECT ${this.querySelect} FROM ${this.table}${conditions}${order}${limit}`,
            values,
        };

        return query;
    }

    /**
     * This is returning the query result rows.
     */
    public async get(): Promise<T[]> {
        const { rows } = await DB.query(this.sql());
        return rows;
    }

    /**
     * This sets the query LIMIT to 1 and calls get method.
     */
    public async first(): Promise<T> {
        this.queryLimit = 1;
        // console.log(this.sql());
        const { rows } = await DB.query(this.sql());
        return rows[0];
    }

    /**
     * This just reads better.
     */
    public async all(): Promise<T[]> {
        this.queryConditions = [];
        const { rows } = await DB.query(this.sql());
        return rows;
    }
}
