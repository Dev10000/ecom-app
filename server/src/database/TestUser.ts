/* eslint-disable max-classes-per-file */
import { QueryConfig } from 'pg';
import pluralize from 'pluralize';
import DB from '../config/database';

const operators = ['=', '>', '<', '>=', '<=', '<>', '!='] as const;
type Operator = typeof operators[number];

type Value = string | number | boolean;

type SortDirection = 'asc' | 'desc';

interface hasTableKey {
    table?: string;
}

interface ICondition {
    field: string;
    operator?: Operator | Value;
    value: Value;
}

interface IOrderBy {
    field: string;
    direction: SortDirection;
}

interface IUser {
    id?: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    address?: string;
    city?: string;
    postal_code?: string;
    phone_number?: string;
    created_at?: string;
}

interface IOptions {
    limit: number;
    select: string[] | '*';
    orderBy: IOrderBy;
    conditions: ICondition[];
}

interface IOptionsAsProps {
    limit?: number;
    select?: string[] | '*';
    orderBy?: IOrderBy;
    conditions?: ICondition[];
}

type OptionKeys = keyof IOptions;

// same as other file <------

class QueryBuilder<T extends hasTableKey> {
    model: T;

    options: IOptions = {
        limit: 0,
        select: '*',
        orderBy: { field: '', direction: 'asc' },
        conditions: [],
    };

    // Constructor

    constructor(options: IOptionsAsProps, model: T) {
        this.model = model;
        // https://stackoverflow.com/questions/41588068/object-assign-override-nested-property
        // Object.assign(this.options, options);
    }

    // Chainable stuff

    limit(limit: number): this {
        this.options.limit = limit;
        return this;
    }

    select(...args: string[]): this {
        this.options.select = args;
        return this;
    }

    orderBy(field: string, direction: SortDirection = 'asc'): this {
        this.options.orderBy = { field, direction };
        return this;
    }

    where(field: string, operatorOrValue: Value | Operator, value?: Value): this {
        if (value) {
            this.options.conditions.push({ field, operator: operatorOrValue, value });
        } else {
            this.options.conditions.push({ field, operator: '=', value: operatorOrValue });
        }
        return this;
    }

    // database related stuff (Unchainable)

    sql(): QueryConfig {
        const values = ['values here...'];

        const query: QueryConfig = {
            text: `SELECT ${this.options.select} FROM ${this.model.table}`,
            values,
        };

        return query;
    }
}

export default class Model<T> {
    instance: T | null = null;

    protected table = 'users';

    // queryBuilder = new QueryBuilder(this.table);

    // Chainable methods again, static

    static limit(limit: number) {
        return new QueryBuilder({ limit }, this);
    }
}

class User extends Model<IUser> {}

console.dir(User);

// console.log(User.limit(10).sql());

// console.log(User.sql());

/** */

// in controller:
// import User from 'User';

// User.where('id', 1).first() -> return IUser
// User.where('age', '>', 30).limit(10).get() -> return IUser[]
// User.all() -> return IUser[]
// User.create({ name: 'John', age: 30 }) -> create an instance of the model(and persist it to DB) and return IUser

// User.where('id', 1).first().then(
//     user => {
//         user.name = 'updated name'
//         user.save().then(updatedUser => {
//             return updatedUser: IUser
//         }).catch(err)...
//     }
// )
