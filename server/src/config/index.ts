// import dotenv from 'dotenv';

// dotenv.config();

const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PORT, JWT_SECRET, JWT_EXPIRATION_TIME, SALT_ROUNDS } = process.env;

export default {
    PORT: PORT || 5000,
    DB: {
        USER: DB_USER || 'postgres',
        PASS: DB_PASS,
        HOST: DB_HOST || 'localhost',
        NAME: DB_NAME || 'dev_db',
        PORT: Number(DB_PORT) || 5432,
    },
    JWT_SECRET: JWT_SECRET || 'Some_default_random_secret_token_here',
    JWT_EXPIRATION_TIME: JWT_EXPIRATION_TIME || '1h',
    SALT_ROUNDS: Number(SALT_ROUNDS) || 10,
};
