import pluralize from 'pluralize';
import QueryBuilder from './QueryBuilder';

export default class Model<T> {
    /**
     * Primary key is by default `id`
     */
    id?: number; // need to update to primary Key for exceptions

    /**
     * Default table name. This can be overwritten in class definition
     */
    protected table = this.predefinedTableName();

    // hidden = [];

    // fillable = []; <- to prevent mass assignment

    // useSoftDeletes = false;

    predefinedTableName(): string {
        // https://stackoverflow.com/questions/30521224/javascript-convert-pascalcase-to-underscore-case
        return pluralize(this.constructor.name.split(/(?=[A-Z])/).join('_')).toLowerCase();
    }

    // constructor(instance: T) {
    //     Object.assign(this, instance);
    // }

    static qb(): QueryBuilder<any> {
        return new QueryBuilder<any>(this);
    }

    async save(): Promise<this> {
        let sql;

        if (this.id) {
            sql = `UPDATE ${this.table} SET (keys) = (values) WHERE id=${this.id};`;
        } else {
            sql = `INSERT INTO ${this.table} (keys) VALUES (values $ $ $);`;
        }
        console.log(sql);
        return this;
    }

    // returning(private returning: number): this {
    //     return new QueryBuilder(this).returning(returning);
    // }
}
