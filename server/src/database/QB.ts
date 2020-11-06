/* eslint-disable no-shadow */
// www.typescriptlang.org/docs/handbook/mixins.html

type Constructor = new (...args: unknown[]) => unknown;

export default function qb<T>(Model: T) {
    return class QB {
        where(): this {
            return this;
        }

        whereNull(): this {
            return this;
        }

        whereNotNull(): this {
            return this;
        }

        limit(): this {
            return this;
        }

        select(): this {
            return this;
        }
    };
}
