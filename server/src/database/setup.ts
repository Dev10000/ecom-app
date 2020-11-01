import pool from '../config/database';

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
    "country" varchar
    "postal_code" varchar(50),
    "phone_number" varchar(50),
    "created_at" varchar
  );`;
// TIM Changed the created_at to varchar (not permanent) because some issues with the timestamp when loading mock data "error: date/time field value out of range: "1585330511000"

    const res = await pool.query(usersQuery);
    console.log(res);
    return res;
};

const create_products_table = async () => {
    const productsQuery = `DROP TABLE IF EXISTS "products" cascade;
  CREATE TABLE "products" (
    "id" SERIAL PRIMARY KEY,
    "title" varchar(200) NOT NULL,
    "slug" varchar(200) UNIQUE NOT NULL,
    "description" text,
    "price" decimal(8,4),
    "weight" int,
    "package_size" varchar(100),
    "discount" decimal(2,2),
    "product_category_id" int NOT NULL,
    "stock_qty" int,
    "created_at" timestamp,
    "updated_at" timestamp,
    "deleted_at" timestamp
  );

  ALTER TABLE "products" ADD FOREIGN KEY ("product_category_id") REFERENCES "product_categories" ("id");
  CREATE INDEX ON "products" ("product_category_id");
  `;

    const res = await pool.query(productsQuery);
    console.log(res);
    return res;
};

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

const create_product_options_table = async () => {
    const productOptionsQuery = `DROP TABLE IF EXISTS "product_options" cascade;
  CREATE TABLE "product_options" (
    "id" SERIAL PRIMARY KEY,
    "title" varchar(200)
  );`;

    const res = await pool.query(productOptionsQuery);
    console.log(res);
    return res;
};

const create_product_specs_table = async () => {
    const productSpecsQuery = `DROP TABLE IF EXISTS "product_specs" cascade;
  CREATE TABLE "product_specs" (
    "id" SERIAL PRIMARY KEY,
    "product_id" int NOT NULL,
    "product_options_id" int NOT NULL,
    "value" varchar
  );

  ALTER TABLE "product_specs" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
  ALTER TABLE "product_specs" ADD FOREIGN KEY ("product_options_id") REFERENCES "product_options" ("id");
  CREATE INDEX ON "product_specs" ("product_id", "product_options_id");
  `;

    const res = await pool.query(productSpecsQuery);
    console.log(res);
    return res;
};

const create_orders_table = async () => {
    const ordersQuery = `DROP TABLE IF EXISTS "orders" cascade;
  CREATE TABLE "orders" (
    "id" SERIAL PRIMARY KEY,
    "code" uuid UNIQUE NOT NULL,
    "user_id" int NOT NULL,
    "order_status" varchar,
    "price" decimal(9,4),
    "created_at" timestamp
  );

  ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
  CREATE INDEX ON "orders" ("user_id");
  `;

    const res = await pool.query(ordersQuery);
    console.log(res);
    return res;
};

const create_order_items_table = async () => {
    const orderItemsQuery = `DROP TABLE IF EXISTS "order_items" cascade;
  CREATE TABLE "order_items" (
    "id" SERIAL PRIMARY KEY,
    "order_id" int NOT NULL,
    "product_id" int NOT NULL,
    "coupon_code_id" int NOT NULL,
    "quantity" int,
    "price" decimal(8,4)
  );

  ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");
  ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
  ALTER TABLE "order_items" ADD FOREIGN KEY ("coupon_code_id") REFERENCES "coupon_codes" ("id");
  CREATE UNIQUE INDEX ON "order_items" ("order_id", "product_id", "coupon_code_id");
  `;

    const res = await pool.query(orderItemsQuery);
    console.log(res);
    return res;
};

const create_coupon_codes_table = async () => {
    const couponCodesQuery = `DROP TABLE IF EXISTS "coupon_codes" cascade;
  CREATE TABLE "coupon_codes" (
    "id" SERIAL PRIMARY KEY,
    "code" varchar(100),
    "quantity" int,
    "created_at" timestamp,
    "expired_at" timestamp
  );`;

    const res = await pool.query(couponCodesQuery);
    console.log(res);
    return res;
};

const setup = (): void => {
    console.log('Starting database structuring');
    create_users_table();
    create_products_table();
    create_product_categories_table();
    create_product_options_table();
    create_product_specs_table();
    create_orders_table();
    create_order_items_table();
    create_coupon_codes_table();
    pool.end();
};

setup();
