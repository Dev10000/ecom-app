import Model from '../database/Model';
import Review from './Review';
import DB from '../config/database';
import ProductImage from './ProductImage';

export default class Product extends Model<IProduct> {
    price = 0;

    discount = 0;

    table = 'products';

    hasMany = [{ model: Review }, { model: ProductImage }];

    /**
     * Filter products by specs and options. Returns a promise of an instance.
     * @param options Request body in JSON format
     */
    static async filter(options: Record<string, unknown>): Promise<IProduct[] | undefined> {
        const optionsArray = Object.entries(options);
        const flatOptionsArray = optionsArray.flat(2);
        const values = (flatOptionsArray as string[]).map((name) => name.toLowerCase());

        const count = optionsArray.length;
        let paramIndex = 0;
        const whereArray = [];
        for (let i = 0; i < optionsArray.length; i++) {
            const array = Object.entries(optionsArray[i].flat());
            const params: string[] = [];
            // eslint-disable-next-line no-loop-func
            array.forEach(() => {
                paramIndex += 1;
                params.push(`$${paramIndex}`);
            });
            const title = params[0];
            const value = params.slice(1);
            const text1 = `${i ? ' OR' : 'WHERE'} (LOWER(po.title) = ${title} AND LOWER(ps.value) IN (${value}))`;
            whereArray.push(text1);
        }

        const text = `SELECT products.*, pi.href FROM products
        INNER JOIN (SELECT COUNT(*), sub.product_id FROM
        (SELECT po.title, ps.value, ps.product_id FROM product_specs ps
        INNER JOIN product_options po ON ps.product_options_id = po.id
        ${whereArray.join('')}
        ) AS sub
        GROUP BY (sub.product_id) HAVING COUNT(sub.product_id) >= ${count}) sub2
        ON sub2.product_id = products.id
        INNER JOIN product_images pi ON pi.product_id = products.id
        WHERE default_img = true;`;

        const query = { text, values };
        return DB.query(query).then((response) => {
            if (response.rowCount) {
                return response.rows as IProduct[];
            }
            return undefined;
        });
    }

    /**
     * Get all sub-categories by category id. Returns a promise of an instance.
     * @param id String
     */
    static async getAllInSubCategories(id: string): Promise<IProduct[] | undefined> {
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
            GROUP BY cp.id, c.id, cp.path
            
        )
        SELECT * FROM category_path
        INNER JOIN products p ON category_path.id = p.product_category_id
        INNER JOIN product_images pi ON p.id = pi.product_id
        ORDER BY path;`;

        const query = { text, values };
        return DB.query(query).then((response) => {
            if (response.rowCount) {
                return response.rows as IProduct[];
            }
            return undefined;
        });
    }
}
