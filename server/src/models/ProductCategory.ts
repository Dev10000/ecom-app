import Model from '../database/Model';
import Product from './Product';
import DB from '../config/database';

export default class ProductCategory extends Model<IProductCategory> {
    hasMany = [{ model: Product }];

    /**
     * Get all sub-categories by category id. Returns a promise of an instance. (GROUP BY cp.id, c.id, cp.path)
     * @param id String
     */
    static async getAllSubCategories(id: string): Promise<IProductCategoryModel[] | undefined> {
        const values = [id];
        const text = `WITH RECURSIVE category_path (id, title, path) AS
        (
          SELECT id, title, title::text as path
            FROM product_categories
            WHERE parent_id = $1
          UNION ALL
          SELECT c.id, c.title, CONCAT(cp.path, ' > ', c.title)
            FROM category_path AS cp JOIN product_categories AS c
              ON cp.id = c.parent_id
        )
        SELECT * FROM category_path
        ORDER BY path;`;

        const query = { text, values };
        return DB.query(query).then((response) => {
            if (response.rowCount) {
                return response.rows as IProductCategoryModel[];
            }
            return undefined;
        });
    }

    /**
     * Get whole category tree. Returns a promise of an instance.
     * @param id String
     */
    static async getCategoryTree(): Promise<IProductCategoryModel[] | undefined> {
        const text = `WITH RECURSIVE category_path (id, title, path) AS
        (
          SELECT id, title, title::text as path
            FROM product_categories
            WHERE parent_id IS null
          UNION ALL
          SELECT c.id, c.title, CONCAT(cp.path, ' > ', c.title)
            FROM category_path AS cp JOIN product_categories AS c
              ON cp.id = c.parent_id
        )
        SELECT * FROM category_path
        ORDER BY path;`;

        const query = { text };
        return DB.query(query).then((response) => {
            if (response.rowCount) {
                return response.rows as IProductCategoryModel[];
            }
            return undefined;
        });
    }
}
