/* eslint-disable max-classes-per-file */

interface IOptions {
    limit: number;
    orderBy: string | null;
}

interface IOptionsProps {
    limit?: number;
    orderBy?: string | null;
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

class QueryBuilder<T> {
    model: T | undefined;

    options: IOptions = {
        limit: 0,
        orderBy: null,
    };

    limit(limit: number, model?: T): this {
        this.options.limit = limit;
        if (model) this.model = model;
        return this;
    }

    orderBy(field: string, model?: T): this {
        this.options.orderBy = field;
        if (model) this.model = model;
        return this;
    }

    // eslint-disable-next-line class-methods-use-this
    learning<T>(type: new () => T): T {
        // eslint-disable-next-line new-cap
        return new type();
    }
}

class Model<T> {
    protected static table = 'unknown';

    static limit(limit: number) {
        return new QueryBuilder().limit(limit, this);
    }

    static orderBy(field: string) {
        return new QueryBuilder().orderBy(field, this);
    }

    // Idea discussed after meeting with Perttu
    // static qb() {
    //     return new QueryBuilder(this);
    // }
}

class User extends Model<IUser> {}

const user1 = User.orderBy('test').limit(10).learning(User);

// the new API
// const user1 = User.qb().orderBy('test').limit(10).learning(User);

console.log(user1);
