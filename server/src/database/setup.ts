/* eslint-disable react-hooks/rules-of-hooks */
import { useDBSetup } from './utils';

const { runSetupQuery } = useDBSetup();

const timestampColumns = `"created_at" timestamp with time zone DEFAULT current_timestamp,
    "updated_at" timestamp with time zone`;

const create_countries_table = async () => {
    const countriesQuery = `DROP TABLE IF EXISTS "countries" cascade;
  CREATE TABLE IF NOT EXISTS "countries" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(200) UNIQUE NOT NULL,
    "alpha2" varchar(5) UNIQUE NOT NULL,
    "alpha3" varchar(5) UNIQUE NOT NULL,
    "code" varchar(5) UNIQUE NOT NULL,
    "iso_3166_2" varchar(5) UNIQUE NOT NULL,
    "region" varchar(200),
    "sub_region" varchar(200),
    "intermediate_region" varchar(200),
    "region_code" varchar(200),
    "sub_region_code" varchar(200),
    "intermediate_region_code" varchar(200),
    ${timestampColumns}
);`;

    return runSetupQuery('countries', countriesQuery);
};

const create_users_table = async () => {
    const usersQuery = `DROP TABLE IF EXISTS "users" cascade;
  CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "email" varchar(200) UNIQUE NOT NULL,
    "password" varchar(100) NOT NULL,
    "first_name" varchar(30) NOT NULL,
    "last_name" varchar(100) NOT NULL,
    "address" varchar(100),
    "city" varchar(100),
    "country_id" int,
    "postal_code" varchar(50),
    "phone_number" varchar(50),
    ${timestampColumns}
);

ALTER TABLE "users" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("id") ON DELETE SET NULL;
`;
    return runSetupQuery('users', usersQuery);
};

const create_products_table = async () => {
    const productsQuery = `DROP TABLE IF EXISTS "products" cascade;
  CREATE TABLE IF NOT EXISTS "products" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(200),
  "slug" varchar(200) UNIQUE NOT NULL,
  "description" text,
  "price" decimal(12,4) NOT NULL,
  "weight" decimal(8,4),
  "package_size" varchar(100),
  "discount" decimal(4,2),
  "product_category_id" int,
  "stock_qty" int NOT NULL,
  "deleted_at" timestamp,
  ${timestampColumns}
);

  ALTER TABLE "products" ADD FOREIGN KEY ("product_category_id") REFERENCES "product_categories" ("id") ON DELETE SET NULL;
  CREATE INDEX ON "products" ("product_category_id");
  `;

    return runSetupQuery('products', productsQuery);
};

const create_product_categories_table = async () => {
    const productCategoriesQuery = `DROP TABLE IF EXISTS "product_categories" cascade;
  CREATE TABLE IF NOT EXISTS "product_categories" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(200),
  "parent_id" int,
  "slug" varchar(200) NOT NULL,
  ${timestampColumns}
);

ALTER TABLE "product_categories" ADD CONSTRAINT "unique_slug_parent_id" UNIQUE("parent_id", "slug");
ALTER TABLE "product_categories" ADD CONSTRAINT "unique_title_parent_id" UNIQUE("parent_id", "title");
ALTER TABLE "product_categories" ADD FOREIGN KEY ("parent_id") REFERENCES "product_categories" ("id") ON DELETE SET NULL;
`;

    return runSetupQuery('product_categories', productCategoriesQuery);
};

const create_product_options_table = async () => {
    const productOptionsQuery = `DROP TABLE IF EXISTS "product_options" cascade;
  CREATE TABLE IF NOT EXISTS "product_options" (
    "id" SERIAL PRIMARY KEY,
    "title" varchar(200) NOT NULL,
    ${timestampColumns}
  );`;

    return runSetupQuery('product_options', productOptionsQuery);
};

const create_product_specs_table = async () => {
    const productSpecsQuery = `DROP TABLE IF EXISTS "product_specs" cascade;
  CREATE TABLE IF NOT EXISTS "product_specs" (
    "id" SERIAL PRIMARY KEY,
    "product_id" int NOT NULL,
    "product_options_id" int,
    "value" varchar,
    ${timestampColumns}
  );

  ALTER TABLE "product_specs" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
  ALTER TABLE "product_specs" ADD FOREIGN KEY ("product_options_id") REFERENCES "product_options" ("id");
  CREATE INDEX ON "product_specs" ("product_id", "product_options_id");
  `;

    return runSetupQuery('product_specs', productSpecsQuery);
};

const create_product_images_table = async () => {
    const productImagesQuery = `DROP TABLE IF EXISTS "product_images" cascade;
  CREATE TABLE IF NOT EXISTS "product_images" (
    "id" SERIAL PRIMARY KEY,
    "uuid" uuid,
    "filename" text,
    "href" varchar,
    "default_img" boolean,
    "product_id" int,
    ${timestampColumns}
  );

 ALTER TABLE "product_images" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;
 CREATE INDEX ON "product_images" ("product_id");`;

    return runSetupQuery('product_images', productImagesQuery);
};

const create_orders_table = async () => {
    const ordersQuery = `CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  DROP TABLE IF EXISTS "orders" cascade;
  CREATE TABLE IF NOT EXISTS "orders" (
    "id" SERIAL PRIMARY KEY,
    "code" uuid UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    "user_id" int NOT NULL,
    "order_status" varchar,
    "price" decimal(9,4),
    ${timestampColumns}
  );

  ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
  CREATE INDEX ON "orders" ("user_id");
  `;

    return runSetupQuery('orders', ordersQuery);
};

const create_order_items_table = async () => {
    const orderItemsQuery = `DROP TABLE IF EXISTS "order_items" cascade;
  CREATE TABLE IF NOT EXISTS "order_items" (
    "id" SERIAL PRIMARY KEY,
    "order_id" int NOT NULL,
    "product_id" int NOT NULL,
    "coupon_code_id" int,
    "quantity" int,
    "price" decimal(8,4),
    ${timestampColumns}
  );

  ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");
  ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
  ALTER TABLE "order_items" ADD FOREIGN KEY ("coupon_code_id") REFERENCES "coupon_codes" ("id");
  CREATE UNIQUE INDEX ON "order_items" ("order_id", "product_id", "coupon_code_id");
  `;

    return runSetupQuery('order_items', orderItemsQuery);
};

const create_coupon_codes_table = async () => {
    const couponCodesQuery = `DROP TABLE IF EXISTS "coupon_codes" cascade;
  CREATE TABLE IF NOT EXISTS "coupon_codes" (
    "id" SERIAL PRIMARY KEY,
    "code" varchar(100),
    "quantity" int,
    "expired_at" timestamp,
    ${timestampColumns}
  );`;

    return runSetupQuery('coupon_codes', couponCodesQuery);
};

/** Database Views (at least before we get the query builder able to get relationship data through eager loading)  */

const create_products_view = async () => {
    const productsViewSQL = `DROP VIEW IF EXISTS "products_view"; 
    CREATE VIEW "products_view" AS SELECT *
    FROM products as a
    INNER JOIN (
    SELECT json_agg(a.*)  image,
    product_id
    FROM product_images as a
    GROUP BY product_id) AS b ON a.id = b.product_id`;

    return runSetupQuery('products_view', productsViewSQL);
};

const create_users_view = async () => {
    const query = `DROP VIEW IF EXISTS "users_view"; 
    CREATE VIEW "users_view" AS SELECT users.*, agg.country
    FROM (users
    JOIN ( SELECT json_agg(countries.*) AS country,
    countries.id
    FROM countries
    GROUP BY countries.id) agg ON ((users.country_id = agg.id)))`;

    return runSetupQuery('users_view', query);
};

const create_countries_view = async () => {
    const query = `DROP VIEW IF EXISTS "countries_view"; 
    CREATE VIEW "countries_view" AS SELECT countries.*, agg.users
    FROM (countries
    JOIN ( SELECT json_agg(users.*) AS users,
    users.country_id
    FROM users
    GROUP BY users.country_id) agg ON ((countries.id = agg.country_id)))`;

    return runSetupQuery('countries_view', query);
};

const create_product_specs_view = async () => {
    const query = `DROP VIEW IF EXISTS "product_specs_view"; 
    CREATE VIEW "product_specs_view" AS SELECT product_id, jsonb_object_agg(po.title, ps.value) as specs
    FROM product_specs as ps
    JOIN product_options AS po ON po.id = ps.product_options_id
    GROUP BY product_id`;

    return runSetupQuery('product_specs_view', query);
};

const setup = async () => {
    console.log('\x1b[36m%s\x1b[0m', 'ℹ Started database (re)structuring...');
    await create_countries_table();
    await create_product_categories_table();
    await create_product_specs_table();
    await create_product_options_table();
    await create_product_images_table();
    await create_products_table();
    await create_order_items_table();
    await create_orders_table();
    await create_users_table();
    await create_coupon_codes_table();
    await create_products_view();
    await create_users_view();
    await create_countries_view();
    await create_product_specs_view();
    console.log('\x1b[36m%s\x1b[0m', 'ℹ Database (re)structuring complete!');
};

setup();
