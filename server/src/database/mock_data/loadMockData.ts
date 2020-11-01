import fs from "fs";
import { from } from "pg-copy-streams";
//import { Pool } from 'pg';
import { pool_test_db2 } from '../../config/database';
import pool from '../../config/database';

// const config2 = {
//   host: '3.21.55.190',
//   user: 'postgres',
//   database: "test_db",
//   password: 'G$oFt78$8qiZMBsbX!%!7HWVTwwU*s',
//   port: 5432,
//   max: 20,
// };

// new way, available since 6.0.0:
// create a pool
//var pool = new Pool(config2)

// CREATE PRODUCT CATEGORIES TABLE COPY FROM ANGELA
const create_product_categories_table = async () => {
  const productCategoriesQuery = `DROP TABLE IF EXISTS "product_categories" cascade;
CREATE TABLE "product_categories" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "slug" varchar UNIQUE NOT NULL
);`;

  const res = await pool.query(productCategoriesQuery);
  console.log(res);
  return res;
};

// CREATE USERS TABLE COPY FROM ANGELA
const create_users_table = async () => {
    const usersQuery = `DROP TABLE IF EXISTS "users" cascade;
  CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY,
    "email" varchar(200) UNIQUE NOT NULL,
    "password" varchar(100) NOT NULL,
    "salt" varchar(100) NOT NULL,
    "first_name" varchar(30) NOT NULL,
    "last_name" varchar(100) NOT NULL,
    "address" varchar(100),
    "city" varchar(100),
    "country" varchar(100),
    "postal_code" varchar(50),
    "phone_number" varchar(50),
    "created_at" varchar(100)
  );`;

    const res = await pool.query(usersQuery);
    console.log(res);
    return res;
};

// CSV LOAD test_db
const load_users_csv = () => {
  // connection using created pool
  pool_test_db2.connect(function(err: any, client: any, done: any) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }
      var stream = client.query(from("COPY users FROM STDIN WITH (FORMAT CSV, DELIMITER ',', HEADER, ENCODING 'UTF8', ESCAPE '\n')"))
      var fileStream = fs.createReadStream('./USERS_MOCK_DATA.csv')

      //fileStream.on('error', done)
      fileStream.on('error', (err: any, _client: any) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
      });

      stream.on('error', (err: any, _client: any) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
      });

      stream.on('error', (err: any, _client: any) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
      });

      // stream.on('error', done)
      stream.on('finish', done)
      fileStream.pipe(stream)
      //done()
  })
}

// CROSS DATABASE QUERY dev_db <- test_db
const load_users = async () => {
  /**************************************************************
   * PostgreSQL Cross Database Queries using DBLink Extension
   * This function uses the DBLink extension that needs to be
   * installed to the postgres server source db (db you have made the connection)
   **************************************************************/
  
    const query = `INSERT INTO users(email, password, salt, first_name, last_name, address, city, country, postal_code, phone_number, created_at)
    SELECT email, password, 'This need to be generated', first_name, last_name, address, city, country, postal_code, phone_number, created_at
    FROM dblink('dbname=test_db user=postgres password=G$oFt78$8qiZMBsbX!%!7HWVTwwU*s', 'select email, password, first_name, last_name, address, city, country, postal_code, phone_number, created_at from users')
    AS DATA(email varchar, password varchar, first_name varchar, last_name varchar, address varchar, city varchar, country varchar, postal_code varchar, phone_number varchar, created_at varchar);`;
  
    const res = await pool.query(query);
    console.log(res);
    return res;
  };

// CROSS DATABASE QUERY dev_db <- test_db
const load__product_specs = async () => {
  /**************************************************************
   * PostgreSQL Cross Database Queries using DBLink Extension
   * This function uses the DBLink extension that needs to be
   * installed to the postgres server source db (db you have made the connection)
   **************************************************************/
  
    const query = `INSERT INTO product_specs(product_id, product_options_id, value)
    SELECT DISTINCT ROW_NUMBER () OVER (ORDER BY product_id), 1, value
    FROM dblink('dbname=test_db user=postgres password=G$oFt78$8qiZMBsbX!%!7HWVTwwU*s', 'select uniq_id, product_specifications from products_flipkart')
    AS DATA(product_id varchar, value varchar);`;
  
    const res = await pool.query(query);
    console.log(res);
    return res;
  };

// CROSS DATABASE QUERY dev_db <- test_db
const load__product_categories = async () => {
/**************************************************************
 * PostgreSQL Cross Database Queries using DBLink Extension
 * This function uses the DBLink extension that needs to be
 * installed to the postgres server source db
 * CREATE EXTENSION dblink;
 * HOW TO: http://www.dbrnd.com/2015/05/postgresql-cross-database-queries-using/
 * "The PostgreSQL protocol works like that you always connect to a specific database. If you need a different database, you have to make a new connection."
 * COPY DATABASE: https://www.geeksforgeeks.org/postgresql-copy-database/
 * https://github.com/vitaly-t/pg-promise/wiki/Data-Imports
 * Joining data from multiple Postgres databases link:
 * https://www.cybertec-postgresql.com/en/joining-data-from-multiple-postgres-databases/
 * https://www.codeproject.com/Questions/1020013/how-to-copy-table-one-database-to-another-database
 **************************************************************/

  const query = `INSERT INTO product_categories(title, slug)
  SELECT DISTINCT title AS title, (SELECT title)
  FROM dblink('dbname=test_db user=postgres password=G$oFt78$8qiZMBsbX!%!7HWVTwwU*s', 'select product_category_tree from products_flipkart')
  AS DATA(title varchar);`;

  const res = await pool.query(query);
  console.log(res);
  return res;
};

const setup_tim = (): void => {
  console.log('Starting database structuring tim');
  create_users_table();
  //load_users_csv();


  //pool_test_db2.end();
};

//setup_tim();

//load__product_categories();
//load__product_specs();
load_users(); 
//create_product_categories_table
// pool shutdown
pool_test_db2.end()
pool.end()













