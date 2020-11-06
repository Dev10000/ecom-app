import Model from '../database/Model';
import DB from '../config/database';

export default class Country extends Model<ICountry> {
    id?: number;

    name?: string;

    alpha2?: string;

    alpha3?: string;

    code?: string;

    iso_3166_2?: string;

    region?: string;

    sub_region?: string;

    intermediate_region?: string;

    region_code?: string;

    sub_region_code?: string;

    intermediate_region_code?: string;

    static async create(instance: ICountry): Promise<ICountry> {
        try {
            const query = `INSERT INTO countries (name, alpha2, alpha3, code, iso_3166_2, region, sub_region, intermediate_region, region_code, sub_region_code, intermediate_region_code)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING *`;

            const parameters = [
                instance.name,
                instance.alpha2,
                instance.alpha3,
                instance.code,
                instance.iso_3166_2,
                instance.region,
                instance.sub_region,
                instance.intermediate_region,
                instance.region_code,
                instance.sub_region_code,
                instance.intermediate_region_code,
            ];

            // console.log(query, parameters);

            const res = await DB.query(query, parameters);
            const model = new Country();
            return Object.assign(model, res.rows[0]);
        } catch (err) {
            return Promise.reject(new Error(`DB Error ${err.message}`));
        }
    }

    async store(): Promise<ICountry> {
        try {
            const query = `UPDATE countries SET (name, alpha2, alpha3, code, iso_3166_2, region, sub_region, intermediate_region, region_code, sub_region_code, intermediate_region_code)
                    = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) WHERE id=$12
                    RETURNING * ;`;

            const parameters = [
                this.name,
                this.alpha2,
                this.alpha3,
                this.code,
                this.iso_3166_2,
                this.region,
                this.sub_region,
                this.intermediate_region,
                this.region_code,
                this.sub_region_code,
                this.intermediate_region_code,
                this.id,
            ];

            // console.log(query, parameters);

            await DB.query(query, parameters);
            return this;
        } catch (err) {
            return Promise.reject(new Error(`DB Error ${err.message}`));
        }
    }
}
