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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
pool.on('error', (err, _client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;
