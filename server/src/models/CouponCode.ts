import Model from '../database/Model';
import DB from '../config/database';

export default class CouponCode extends Model<ICouponCode> {
    code?: string;

    quantity?: number;

    expired_at?: string;

    static async create(instance: ICouponCode): Promise<ICouponCode> {
        try {
            const query = `INSERT INTO coupon_codes (code, quantity, created_at, expired_at)
                VALUES ($1, $2, $3, $4)
                RETURNING *`;

            const parameters = [instance.code, instance.quantity, new Date(), instance.expired_at];

            // console.log(query, parameters);

            // const res = await DB.query(query, parameters);
            // const model = new CouponCode();
            // return Object.assign(model, res.rows[0]);
            const res = DB.query(query, parameters);
            return (await res).rows[0];
        } catch (err) {
            return Promise.reject(new Error(`DB Error ${err.message}`));
        }
    }

    async store(): Promise<ICouponCode> {
        try {
            const query = `UPDATE coupon_codes SET (code, quantity, updated_at)
                    = ($1, $2, $3) WHERE id=$4
                    RETURNING * ;`;

            const parameters = [this.code, this.quantity, new Date(), this.id];

            // console.log(query, parameters);

            // await DB.query(query, parameters);
            // return this;
            const res = DB.query(query, parameters);
            return (await res).rows[0];
        } catch (err) {
            return Promise.reject(new Error(`DB Error ${err.message}`));
        }
    }
}
