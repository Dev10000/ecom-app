import { genSaltSync, hashSync, compare } from 'bcrypt';
import config from '../config';
import pool from '../config/database';
import BaseModel from '../database/BaseModel';

export default class User extends BaseModel<IUser> {
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

    created_at?: string;

    public create(
        email: string,
        password: string,
        first_name: string,
        last_name: string,
        address?: string,
        city?: string,
        country_id?: number,
        postal_code?: string,
        phone_number?: string,
    ): this {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.address = address;
        this.city = city;
        this.country_id = country_id;
        this.postal_code = postal_code;
        this.phone_number = phone_number;

        if (password) {
            const salt = genSaltSync(config.SALT_ROUNDS);
            this.password = hashSync(password, salt);
        }

        return this;
    }

    public checkPasswords = async (dbPassword: string, password: string): Promise<boolean> => {
        const match: boolean = await compare(password, dbPassword);

        return match;
    };

    save = async (): Promise<IUser> => {
        try {
            const query = `INSERT INTO users (email, password, first_name, last_name, address, city, country_id, postal_code, phone_number, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING id, email, password, first_name, last_name, address, city, country_id, postal_code, phone_number, created_at`;

            const parameters = [
                this.email,
                this.password,
                this.first_name,
                this.last_name,
                this.address,
                this.city,
                this.country_id,
                this.postal_code,
                this.phone_number,
                new Date(),
            ];

            const res = await pool.query(query, parameters);
            return res.rows[0];
        } catch (err) {
            return Promise.reject(new Error(`DB Error ${err.message}`));
        }
    };
}
