import { Pool } from 'pg';
import config from '.';

// const pool = new Pool({
//     host: config.DB.HOST,
//     user: config.DB.USER,
//     database: config.DB.NAME,
//     password: config.DB.PASS,
//     port: Number(config.DB.PORT),
//     max: 20,
// });

const pool = new Pool ({
  host: '3.21.55.190',
  user: 'postgres',
  database: "dev_db",
  password: 'G$oFt78$8qiZMBsbX!%!7HWVTwwU*s',
  port: 5432,
  max: 20,
});

//eslint-disable-next-line @typescript-eslint/no-unused-vars
pool.on('error', (err, _client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// TIM TEST DB
const pool_test_db = new Pool({
    host: '3.21.55.190',
    user: config.DB.USER,
    database: "test_db",
    password: 'G$oFt78$8qiZMBsbX!%!7HWVTwwU*s',
    port: Number(config.DB.PORT),
    max: 20,
});
// console.log(config.DB)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
pool_test_db.on('error', (err, _client) => {
   console.error('Unexpected error on idle client', err);
   process.exit(-1);
});
//TIM TIM TEST DB

// export default { pool, pool_test_db } // Why this doesn't work
export default pool;
export const pool_test_db2 = pool_test_db;
