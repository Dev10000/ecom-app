/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pool } from 'pg';
import config from '.';

const pool = new Pool({
    host: config.DB.HOST,
    user: config.DB.USER,
    database: config.DB.NAME,
    password: config.DB.PASS,
    port: Number(config.DB.PORT),
    max: 20,
});

pool.on('error', (err, _client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// TIM TEST DB
export const pool_test_db = new Pool({
    host: '3.21.55.190',
    user: config.DB.USER,
    database: 'test_db',
    password: 'G$oFt78$8qiZMBsbX!%!7HWVTwwU*s',
    port: Number(config.DB.PORT),
    max: 20,
});

pool_test_db.on('error', (err, _client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;
