/* eslint-disable max-classes-per-file */
import { QueryConfig } from 'pg';
import DB from '../config/database';

// https://stackoverflow.com/questions/59857223/how-to-convert-typescript-types-of-strings-to-array-of-strings
const operators = ['=', '>', '<', '>=', '<=', '<>', '!='] as const;
type Operator = typeof operators[number];

type Value = string | number | boolean;

interface ICondition {
    field: string;
    operator?: Operator | Value;
    value: Value;
}

export default class BaseModel {
    protected table = '';

    protected querySelect: string[] | string = '*';

    protected queryConditions: ICondition[] = [];

    protected queryLimit = 0;

    protected hidden = [];

    /**
     * Optional. Usage:
     * where('field', 'value')
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
     * This is where we build up the query object.
     */
    public sql(): QueryConfig {
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

        const query: QueryConfig = {
            text: `SELECT ${this.querySelect} FROM ${this.table}${conditions}${limit}`,
            values,
        };

        return query;
    }

    /**
     * This is returning the query result rows.
     */
    public async get(): Promise<unknown[]> {
        const { rows } = await DB.query(this.sql());
        return Promise.resolve(rows);
    }

    /**
     * This sets the query LIMIT to 1 and calls get method.
     */
    public async first(): Promise<unknown[]> {
        this.queryLimit = 1;
        return this.get();
    }
}

class User extends BaseModel {
    protected table = 'users';
}

const user = new User();
console.log(user.where('email', 'jpimblott0@ihg.com').select('id', 'first_name', 'last_name').first());
console.dir(user);
