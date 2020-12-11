import Model from '../database/Model';
import Review from './Review';
import DB from '../config/database';
import QueryBuilder from '../database/QueryBuilder';

export default class Product extends Model<IProduct> {
    price = 0;

    discount = 0;

    table = 'products_view';

    async reviews(): Promise<IReview[]> {
        return this.hasMany(Review);
    }

    /**
     * Filter products by specs and options. Returns a promise of an instance.
     * @param options Request body in JSON format
     */
    static async filter(options: Record<string, unknown>): Promise<IProduct[] | undefined> {
        /**
         * 
         * {
            "color": ["black", "blue"],
            "brand": ["amzer", "bracketron"]
        }

         */

        // const onlyKeys = Object.keys(options); // => ['color', 'brand']

        // previousKeylenght = 0;
        // onlyKeys.forEach((key, index) => {// => key = color, index = 0
        //     const dolarSignIndex = index + previousKeylenght + 1;
        //     previousKeylenght = option[key].length
        // });

        const optionsArray = Object.entries(options);
        const flatOptionsArray = optionsArray.flat(2);
        const values = (flatOptionsArray as string[]).map((name) => name.toLowerCase());

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
        // Query Builder End

        const text = `SELECT products.*, pi.href FROM products
        INNER JOIN (SELECT COUNT(*), sub.product_id FROM
        (SELECT po.title, ps.value, ps.product_id FROM product_specs ps
        INNER JOIN product_options po ON ps.product_options_id = po.id
        ${whereArray.join('')}
        ) AS sub
        GROUP BY (sub.product_id) HAVING COUNT(sub.product_id) >= 2) sub2
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
     * Finds a record by the ID and returns a promise of an instance.
     * @param id
     */
    // static async findProduct<U>(id: number | string): Promise<U | undefined> {
    //     // eslint-disable-next-line no-restricted-globals
    //     if (isNaN(Number(id))) {
    //         return undefined;
    //     }

    //     const { table } = new this<U>();
    //     const text = `SELECT * FROM ${table} AS a INNER JOIN ( SELECT json_agg(a.*) AS image, product_id FROM product_images AS a GROUP BY product_id) AS b ON a.id = b.product_id WHERE a.id=$1;`;
    //     const values = [id];
    //     const query = { text, values };
    //     return DB.query(query).then((response) => {
    //         if (response.rowCount) {
    //             const instance = new this<U>();
    //             Object.assign(instance, response.rows[0]);
    //             return (instance as unknown) as U;
    //         }
    //         return undefined;
    //     });
    // }
}
