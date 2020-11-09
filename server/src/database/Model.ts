import pluralize from 'pluralize';
import { removeFields } from './utils';
import DB from '../config/database';
import QB from './QB';

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
    readonly table = pluralize(this.constructor.name.split(/(?=[A-Z])/).join('_')).toLowerCase();

    /**
     * An array of fields that should be hidden for the current model.
     * This should be added to the model where appropriate.
     */
    readonly hidden: string[] = [];

    /**
     * Saves the current state of the object into the database.g
     */
    async save(): Promise<T> {
        let text;

        const { table } = this;
        const object = removeFields(this, ['table', 'hidden']);
        const keys = Object.keys(object);
        const values = Object.values(object);
        const valueRefs = values.map((_value, index) => `$${index + 1}`);

        // !! TODO: need to handle here created_at & updated_at !!

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
    static async find<U>(id: number): Promise<U> {
        const instance = new this<U>();
        const text = `SELECT * FROM ${instance.table} WHERE id=$1 LIMIT 1;`;
        const values = [id];
        const query = { text, values };
        return DB.query(query).then((response) => {
            Object.assign(instance, response.rows[0]);
            return (instance as unknown) as U;
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
     * @param otherModel Other Model Name. ex. Country
     * @param localField [OPTIONAL] ex. country_id | Defaults to the lowercase version of the other model + '_id'
     * @param remoteField [OPTIONAL] ex. id | Defaults to 'id'
     */
    belongsTo<U>(otherModel: Constructor<U>, localField?: string, remoteField?: string): Promise<U> {
        const localFieldKey = (localField as keyof this) || (`${otherModel.name.toLowerCase()}_id` as keyof this); // Country -> country_id
        remoteField = remoteField || `id`; // default field name is 'id' unless specfied otherwise
        const conditionValue = (this[localFieldKey] as unknown) as ConditionValue;
        return QB<U>(otherModel).where(remoteField, conditionValue).first();
    }

    /**
     * hasMany Model relationship
     * @param otherModel Other Model Name. ex. User
     * @param localField [OPTIONAL] ex. id | Defaults to 'id'
     * @param remoteField [OPTIONAL] ex. country_id | Defaults to the lowercase version of this model + '_id'
     */
    hasMany<U>(otherModel: Constructor<U>, localField?: string, remoteField?: string): Promise<U[]> {
        const localFieldKey = (localField as keyof this) || (`id` as keyof this); // default field name is 'id' unless specfied otherwise
        remoteField = remoteField || `${this.constructor.name.toLowerCase()}_id`; // User -> users_id
        const conditionValue = (this[localFieldKey] as unknown) as ConditionValue;
        return QB<U>(otherModel).where(remoteField, conditionValue).get();
    }
}
