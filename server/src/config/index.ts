const { PORT, DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PORT } = process.env;

export default {
    PORT: PORT || 5000,
    DB: {
        USER: DB_USER || 'postgres',
        PASS: DB_PASS,
        HOST: DB_HOST || 'localhost',
        NAME: DB_NAME || 'dev_db',
        PORT: DB_PORT || 5432,
    },
};
