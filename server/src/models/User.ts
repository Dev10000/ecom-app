import { genSaltSync, hashSync, compare } from 'bcrypt';
import config from '../config';
import pool from '../config/database';

export default class User {
    id?: number;

    email: string;

    password?: string;

    first_name: string;

    last_name: string;

    address?: string;

    city?: string;

    postal_code?: string;

    phone_number?: string;

    created_at?: string;

    constructor(
        email: string,
        password: string,
        first_name: string,
        last_name: string,
        address?: string,
        city?: string,
        postal_code?: string,
        phone_number?: string,
    ) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.address = address;
        this.city = city;
        this.postal_code = postal_code;
        this.phone_number = phone_number;

        if (password) {
            const salt = genSaltSync(config.SALT_ROUNDS);
            this.password = hashSync(password, salt);
        }
    }

    static findById = async (id: number): Promise<IUser> => {
        try {
            const res = await pool.query(`SELECT * FROM users WHERE id=$1;`, [id]);
            return res.rows[0];
        } catch (err) {
            return Promise.reject(new Error('Could not fetch DB data'));
        }
    };

    static findByEmail = async (email: string): Promise<IUser> => {
        try {
            const res = await pool.query(`SELECT * FROM users WHERE email=$1;`, [email]);
            return res.rows[0];
        } catch (err) {
            return Promise.reject(new Error('Could not fetch DB data'));
        }
    };

    static checkPasswords = async (dbPassword: string, password: string): Promise<boolean> => {
        const match: boolean = await compare(password, dbPassword);

        return match;
    };

    save = async (): Promise<IUser> => {
        try {
            const query = `INSERT INTO users (email, password, first_name, last_name, address, city, postal_code, phone_number, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING id, email, password, first_name, last_name, address, city, postal_code, phone_number, created_at`;

            const parameters = [
                this.email,
                this.password,
                this.first_name,
                this.last_name,
                this.address,
                this.city,
                this.postal_code,
                this.phone_number,
                'now()',
            ];

            const res = await pool.query(query, parameters);
            return res.rows[0];
        } catch (err) {
            return Promise.reject(new Error('Could not fetch DB data'));
        }
    };
}
