import pluralize from 'pluralize';
import { QueryResult } from 'pg';
import { removeFields, pascalToSnakeCase } from './utils';
import DB from '../config/database';
import QueryBuilder from './QueryBuilder';

export default class Model<T> {
    /**
     * This is by default the primary key for each model extending the Model class
     * TODO: Try to find a more generic aproach to handle exceptions
     */
    id?: number;

    /**
     * Default table name. This can be overwritten in class definition
     * By default it's the camel case pluralized version of the Model class
     * ex. ProductCategory -> product_categories
     */
    readonly table = pluralize(pascalToSnakeCase(this.constructor.name));

    /**
     * An array of fields that should be hidden for the current model.
     * This should be added to the model where appropriate.
     */
    readonly hidden: string[] = [];

    relationships: IRelationship[] = [];

    created_at = 'NOW()';

    updated_at = 'NOW()';

    /**
     * Saves the current state of the object into the database.
     */
    async save(): Promise<T> {
        let text: string;

        const { table } = this;
        let object = removeFields(this, ['table', 'relationships', 'hidden']);

        object = { ...object, updated_at: 'NOW()' };

        if (!this.id) {
            object = { ...object, created_at: 'NOW()' };
        }

        const keys = Object.keys(object);
        const values = Object.values(object);
        const valueRefs = values.map((_value, index) => `$${index + 1}`);

        if (this.id) {
            text = `UPDATE ${table} SET (${keys}) = (${valueRefs}) WHERE id=${this.id} RETURNING *;`;
        } else {
            text = `INSERT INTO ${table} (${keys}) VALUES (${valueRefs}) RETURNING *;`;
        }

        const query = { text, values };
        // console.log(query);
        // Idealy, this should be probably moved in QB.ts
        return DB.query(query).then((response) => response.rows[0] as T);
    }

    static create<U>(props: Partial<U>): U {
        const instance = new this();
        Object.assign(instance, props);
        return (instance as unknown) as U & IModel;
    }

    /**
     * Finds a record by the ID and returns a promise of an instance.
     * @param id
     */
    static async find<U>(id: number | string): Promise<U | undefined> {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(Number(id))) {
            return undefined;
        }

        const { table } = new this<U>();
        const text = `SELECT * FROM ${table} WHERE id=$1 LIMIT 1;`;
        const values = [id];
        const query = { text, values };
        return DB.query(query).then((response) => {
            if (response.rowCount) {
                const instance = new this<U>();
                Object.assign(instance, response.rows[0]);
                return (instance as unknown) as U;
            }
            return undefined;
        });
    }

    /**
     * Finds a record by the ID or custom column and returns a promise of an instance.
     * @param id
     * @param column OPTIONAL default id
     * @param distinct_on OPTIONAL default empty string. Example string: 'DISTINCT ON(column_name)'
     */
    static async findCustom<U>(id: number | string, column = 'id', distinct_on = ''): Promise<QueryResult | undefined> {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(Number(id))) {
            return undefined;
        }
        const { table } = new this<U>();
        const text = `SELECT ${distinct_on}* FROM ${table} WHERE ${column}=$1;`;
        const values = [id];
        console.log(text);
        console.log(id);
        const query = { text, values };
        return DB.query(query);
        // .then((response) => {
        // if (response.rowCount) {
        //     const instance = new this<U>();
        //     Object.assign(instance, response.rows);
        //     return (instance as unknown) as U;
        // }
        // return undefined;
        // });
    }

    /**
     * Filter products by specs and options. Returns a promise of an instance.
     * @param body Request body in JSON format
     */
    static async filterProduct<U>(body: Record<string, unknown>): Promise<QueryResult | undefined> {
        const newArr = Object.entries(body);
        const flatArr = newArr.flat(2);
        const values = (flatArr as string[]).map((name) => name.toLowerCase());

        // Query Builder Start
        let i2 = 0;
        const finalArr = [];
        for (let i = 0; i < newArr.length; i++) {
            let whereOr = '';
            if (i === 0) {
                whereOr = 'WHERE';
            } else {
                whereOr = ' OR';
            }
            const array = Object.entries(newArr[i].flat());
            const params: string[] = [];
            // eslint-disable-next-line no-loop-func
            array.forEach(() => {
                i2 += 1;
                params.push(`$${i2}`);
            });
            const title = params.slice(0, 1);
            const value = params.slice(1);
            const text1 = `${whereOr} (LOWER(po.title) = ${title} AND LOWER(ps.value) IN (${value}))`;
            finalArr.push(text1);
        }
        // Query Builder End

        const text = `SELECT products.*, pi.href FROM products
        INNER JOIN (SELECT COUNT(*), sub.product_id FROM
        (SELECT po.title, ps.value, ps.product_id FROM product_specs ps
        INNER JOIN product_options po ON ps.product_options_id = po.id
        ${finalArr.join('')}
        ) AS sub
        GROUP BY (sub.product_id) HAVING COUNT(sub.product_id) >= 2) sub2
        ON sub2.product_id = products.id
        INNER JOIN product_images pi ON pi.product_id = products.id
        WHERE default_img = true;`;

        const query = { text, values };
        return DB.query(query);
        // .then((response) => {
        // if (response.rowCount) {
        //     const instance = new this<U>();
        //     Object.assign(instance, response.rows);
        //     return (instance as unknown) as U;
        // }
        // return undefined;
        // });
    }

    /**
     * Finds a record by the ID and returns a promise of an instance.
     * @param id
     */
    static async findProduct<U>(id: number | string): Promise<U | undefined> {
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(Number(id))) {
            return undefined;
        }

        const { table } = new this<U>();
        const text = `SELECT * FROM ${table} AS a INNER JOIN ( SELECT json_agg(a.*) AS image, product_id FROM product_images AS a GROUP BY product_id) AS b ON a.id = b.product_id WHERE a.id=$1;`;
        const values = [id];
        const query = { text, values };
        return DB.query(query).then((response) => {
            if (response.rowCount) {
                const instance = new this<U>();
                Object.assign(instance, response.rows[0]);
                return (instance as unknown) as U;
            }
            return undefined;
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
     * @param OtherModel Other Model Name. ex. Country
     * @param relationshipName [OPTIONAL] the name of the relationship ex. 'country' | Defaults to the snake_case version of the other model
     * @param localField [OPTIONAL] ex. country_id | Defaults to the snake_case version of the other model + '_id'
     * @param remoteField [OPTIONAL] ex. id | Defaults to 'id'
     */
    belongsTo<U>(
        OtherModel: Constructor<U>,
        relationshipName?: string,
        localField?: string,
        remoteField?: string,
    ): Promise<U> {
        const localFieldKey = (localField as keyof this) || (`${pascalToSnakeCase(OtherModel.name)}_id` as keyof this); // Country -> country_id
        remoteField = remoteField || 'id'; // default field name is 'id' unless specfied otherwise
        relationshipName = relationshipName || pascalToSnakeCase(OtherModel.name);
        const conditionValue = (this[localFieldKey] as unknown) as ConditionValue;
        this.relationships.push({
            type: 'belongsTo',
            name: relationshipName,
            constructor: OtherModel,
            table: new OtherModel().table,
            localField: localField as keyof T,
            remoteField,
        });
        return QueryBuilder<U>(OtherModel).where(remoteField, conditionValue).first();
    }

    /**
     * hasMany Model relationship
     * @param otherModel Other Model Name. ex. User
     * @param relationshipName [OPTIONAL] the name of the relationship ex. 'users' | Defaults to the pluralized snake_case version of the other model
     * @param localField [OPTIONAL] ex. id | Defaults to 'id'
     * @param remoteField [OPTIONAL] ex. country_id | Defaults to the snake_case version of this model + '_id'
     */
    hasMany<U>(
        OtherModel: Constructor<U>,
        relationshipName?: string,
        localField?: string,
        remoteField?: string,
    ): Promise<U[]> {
        const localFieldKey = (localField as keyof this) || (`id` as keyof this); // default field name is 'id' unless specfied otherwise
        remoteField = remoteField || `${pascalToSnakeCase(this.constructor.name)}_id`; // User -> users_id
        relationshipName = relationshipName || pluralize(pascalToSnakeCase(OtherModel.name)); // User -> users
        const conditionValue = (this[localFieldKey] as unknown) as ConditionValue;
        this.relationships.push({
            type: 'hasMany',
            name: relationshipName,
            constructor: OtherModel,
            table: new OtherModel().table,
            localField: localFieldKey,
            remoteField,
        });
        return QueryBuilder<U>(OtherModel).where(remoteField, conditionValue).get();
    }
}
