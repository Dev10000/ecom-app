import pluralize from 'pluralize';
import QueryBuilder from './QueryBuilder';

export default class Model<T> {
    /**
     * Primary key
     */
    id?: number; // need to update to primary Key for exceptions

    /**
     * Default table name. This can be overwritten in Class definition
     */
    table = this.predefinedTableName();

    // hidden = [];

    // useSoftDeletes = false;

    predefinedTableName(): string {
        // https://stackoverflow.com/questions/30521224/javascript-convert-pascalcase-to-underscore-case
        return pluralize(this.constructor.name.split(/(?=[A-Z])/).join('_')).toLowerCase();
    }

    static qb(): QueryBuilder<any> {
        return new QueryBuilder<any>(this);
    }

    async save(): Promise<this> {
        const sql = `UPDATE ${this.table} SET (keys) = (values) WHERE id=${this.id}`;
        console.log(sql);
        return this;
    }

    //     returning(private returning: number): this {
    //         return new QueryBuilder(this).returning(returning);
    //     }
}
