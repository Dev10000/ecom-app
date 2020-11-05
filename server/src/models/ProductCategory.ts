import Model from '../database/Model';

import DB from '../config/database';

export default class ProductCategory extends Model<IProductCategory> {
    id?: number;

    title?: string;

    slug?: string;

    parent_id?: number;

    created_at?: string;

    updated_at?: string;

    static async create(title: string, slug: string, parent_id: number): Promise<IProductCategory> {
        try {
            const query = `INSERT INTO product_categories (title, slug, parent_id, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`;

            const parameters = [title, slug, parent_id, new Date(), new Date()];

            console.log(query, parameters);

            const res = await DB.query(query, parameters);
            const instance = new ProductCategory();
            return Object.assign(instance, res.rows[0]);
        } catch (err) {
            return Promise.reject(new Error(`DB Error ${err.message}`));
        }
    }

    async store(): Promise<IProductCategory> {
        try {
            const query = `UPDATE product_categories SET (title, slug, parent_id, updated_at)
                    = ($1, $2, $3, $4) WHERE id=$5 RETURNING * ;`;

            const parameters = [this.title, this.slug, this.parent_id, new Date(), this.id];

            console.log(query, parameters);

            await DB.query(query, parameters);
            return this;
        } catch (err) {
            return Promise.reject(new Error(`DB Error ${err.message}`));
        }
    }
}
