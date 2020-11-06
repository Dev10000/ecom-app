import { genSaltSync, hashSync, compare } from 'bcrypt';
import config from '../config';
import pool from '../config/database';
import Model from '../database/Model';

export default class User extends Model<IUser> {
    id?: number;

    email?: string;

    password?: string;

    first_name?: string;

    last_name?: string;

    address?: string;

    city?: string;

    country_id?: number;

    postal_code?: string;

    phone_number?: string;

    static async create(
        email: string,
        password: string,
        first_name: string,
        last_name: string,
        address?: string,
        city?: string,
        country_id?: number,
        postal_code?: string,
        phone_number?: string,
    ): Promise<IUser> {
        if (password) {
            const salt = genSaltSync(config.SALT_ROUNDS);
            password = hashSync(password, salt);
        }

        try {
            const query = `INSERT INTO users (email, password, first_name, last_name, address, city, country_id, postal_code, phone_number, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING id, email, password, first_name, last_name, address, city, country_id, postal_code, phone_number, created_at`;

            const parameters = [
                email,
                password,
                first_name,
                last_name,
                address,
                city,
                country_id,
                postal_code,
                phone_number,
                new Date(),
            ];

            const res = await pool.query(query, parameters);
            return res.rows[0];
        } catch (err) {
            return Promise.reject(new Error(`DB Error ${err.message}`));
        }
    }

    static checkPasswords = async (dbPassword: string, password: string): Promise<boolean> => {
        const match: boolean = await compare(password, dbPassword);

        return match;
    };
}
