import pluralize from 'pluralize';
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

    belongsTo: IRelationship[] = [];

    hasMany: IRelationship[] = [];

    created_at = 'NOW()';

    updated_at = 'NOW()';

    /**
     * Saves the current state of the object into the database.
     */
    async save(): Promise<T> {
        let text: string;

        const { table } = this;
        let object = removeFields(this, ['table', 'belongsTo', 'hasMany', 'hidden']);

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
     * This will return the object without the internal and hidden fields.
     */
    toJSON(): Pick<this, Exclude<keyof this, keyof this>> {
        const removable = ['table', 'hidden', 'belongsTo', 'hasMany', ...this.hidden];
        return removeFields(this, (removable as unknown) as (keyof this)[]);
    }

    // /**
    //  * BelongsTo Model relationship
    //  * @param OtherModel Other Model Name. ex. Country
    //  * @param relationshipName [OPTIONAL] the name of the relationship ex. 'country' | Defaults to the snake_case version of the other model
    //  * @param localField [OPTIONAL] ex. country_id | Defaults to the snake_case version of the other model + '_id'
    //  * @param remoteField [OPTIONAL] ex. id | Defaults to 'id'
    //  */
    // belongsTo<U>(
    //     OtherModel: Constructor<U>,
    //     relationshipName?: string,
    //     localField?: string,
    //     remoteField?: string,
    // ): Promise<U> {
    //     const localFieldKey = (localField as keyof this) || (`${pascalToSnakeCase(OtherModel.name)}_id` as keyof this); // Country -> country_id
    //     remoteField = remoteField || 'id'; // default field name is 'id' unless specfied otherwise
    //     relationshipName = relationshipName || pascalToSnakeCase(OtherModel.name);
    //     const conditionValue = (this[localFieldKey] as unknown) as ConditionValue;
    //     this.relationships.push({
    //         type: 'belongsTo',
    //         name: relationshipName,
    //         constructor: OtherModel,
    //         table: new OtherModel().table,
    //         localField: localField as keyof T,
    //         remoteField,
    //     });
    //     return QueryBuilder<U>(OtherModel).where(remoteField, conditionValue).first();
    // }

    // /**
    //  * hasMany Model relationship
    //  * @param otherModel Other Model Name. ex. User
    //  * @param relationshipName [OPTIONAL] the name of the relationship ex. 'users' | Defaults to the pluralized snake_case version of the other model
    //  * @param localField [OPTIONAL] ex. id | Defaults to 'id'
    //  * @param remoteField [OPTIONAL] ex. country_id | Defaults to the snake_case version of this model + '_id'
    //  */
    // hasMany<U>(
    //     OtherModel: Constructor<U>,
    //     relationshipName?: string,
    //     localField?: string,
    //     remoteField?: string,
    // ): Promise<U[]> {
    //     const localFieldKey = (localField as keyof this) || (`id` as keyof this); // default field name is 'id' unless specfied otherwise
    //     remoteField = remoteField || `${pascalToSnakeCase(this.constructor.name)}_id`; // User -> users_id
    //     relationshipName = relationshipName || pluralize(pascalToSnakeCase(OtherModel.name)); // User -> users
    //     const conditionValue = (this[localFieldKey] as unknown) as ConditionValue;
    //     this.relationships.push({
    //         type: 'hasMany',
    //         name: relationshipName,
    //         constructor: OtherModel,
    //         table: new OtherModel().table,
    //         localField: localFieldKey,
    //         remoteField,
    //     });
    //     return QueryBuilder<U>(OtherModel).where(remoteField, conditionValue).get();
    // }
}
