import Model from '../database/Model';

import DB from '../config/database';

export default class Product extends Model<IProduct> {
    title?: string;

    slug?: string;

    description?: string;

    price?: number;

    discount?: number;

    stock_qty?: number;

    weight?: number;

    package_size?: string;

    product_category_id?: number;

    static async create(
        title: string,
        slug: string,
        description: string,
        price: number,
        discount: number,
        stock_qty: number,
        weight?: number,
        package_size?: string,
        product_category_id?: number,
    ): Promise<IProduct> {
        try {
            const query = `INSERT INTO products (title, slug, description, price, weight, package_size, discount, product_category_id, stock_qty, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING *`;

            const parameters = [
                title,
                slug,
                description,
                price,
                weight,
                package_size,
                discount,
                product_category_id,
                stock_qty,
                new Date(),
                new Date(),
            ];

            console.log(query, parameters);

            const res = await DB.query(query, parameters);
            const instance = new Product();
            return Object.assign(instance, res.rows[0]);
        } catch (err) {
            return Promise.reject(new Error(`DB Error ${err.message}`));
        }
    }

    async store(): Promise<IProduct> {
        try {
            const query = `UPDATE products SET (title, slug, description, price, weight, package_size, discount, product_category_id, stock_qty, updated_at)
                    = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) WHERE id=$11
                    RETURNING * ;`;

            const parameters = [
                this.title,
                this.slug,
                this.description,
                this.price,
                this.weight,
                this.package_size,
                this.discount,
                this.product_category_id,
                this.stock_qty,
                new Date(),
                this.id,
            ];

            console.log(query, parameters);

            await DB.query(query, parameters);
            return this;
        } catch (err) {
            return Promise.reject(new Error(`DB Error ${err.message}`));
        }
    }
}
