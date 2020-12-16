const {
    NODE_ENV,
    PORT,
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_NAME,
    DB_PORT,
    JWT_SECRET,
    JWT_EXPIRATION_TIME,
    SALT_ROUNDS,
} = process.env;

export default {
    NODE_ENV: NODE_ENV || 'production', // this can be 'production', 'development' or 'testing'
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
    ORDER_STATUS: {
        PENDING: 'Pending', // The user has submited the order, the order needs to be paid
        CONFIRMED: 'Confirmed', // The payment for the order was done, but the seller didn't sent the items
        DISPATCHED: 'Dispatched', // after the products get send
        COMPLETED: 'Completed', // When the buyer gets the products
        CANCELED: 'Canceled', // If the user changes it's mind... -> refund or not ??
    },
};
