/* eslint-disable react-hooks/rules-of-hooks */
import { useDBSetup } from './utils';

const { runSetupQuery } = useDBSetup();

const create_countries_table = async () => {
    const countriesQuery = `DROP TABLE IF EXISTS "countries" cascade;
  CREATE TABLE IF NOT EXISTS "countries" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(200),
  "alpha2" varchar(5),
  "alpha3" varchar(5),
  "code" varchar(5),
  "iso_3166_2" varchar(100),
  "region" varchar(200),
  "sub_region" varchar(200),
  "intermediate_region" varchar(200),
  "region_code" varchar(200),
  "sub_region_code" varchar(200),
  "intermediate_region_code" varchar(200)
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
    "address" varchar(100) NOT NULL,
    "city" varchar(100) NOT NULL,
    "country_id" int,
    "postal_code" varchar(50) NOT NULL,
    "phone_number" varchar(50) NOT NULL,
    "created_at" timestamp
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
  "description" text NOT NULL,
  "price" decimal(8,4) NOT NULL,
  "weight" decimal(8,4),
  "package_size" varchar(100),
  "discount" decimal(2,2),
  "product_category_id" int,
  "stock_qty" int NOT NULL,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
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
  "slug" varchar(200) UNIQUE NOT NULL,
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "product_categories" ADD FOREIGN KEY ("parent_id") REFERENCES "product_categories" ("id") ON DELETE SET NULL;
`;

    return runSetupQuery('product_categories', productCategoriesQuery);
};

const create_product_options_table = async () => {
    const productOptionsQuery = `DROP TABLE IF EXISTS "product_options" cascade;
  CREATE TABLE IF NOT EXISTS "product_options" (
    "id" SERIAL PRIMARY KEY,
    "title" varchar(200) NOT NULL
  );`;

    return runSetupQuery('product_options', productOptionsQuery);
};

const create_product_specs_table = async () => {
    const productSpecsQuery = `DROP TABLE IF EXISTS "product_specs" cascade;
  CREATE TABLE IF NOT EXISTS "product_specs" (
    "id" SERIAL PRIMARY KEY,
    "product_id" int NOT NULL,
    "product_options_id" int NOT NULL,
    "value" varchar
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
    "href" varchar,
    "default_img" boolean,
    "product_id" int
  );
  
 ALTER TABLE "product_images" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;
 CREATE INDEX ON "product_images" ("product_id");`;

    return runSetupQuery('product_images', productImagesQuery);
};

const create_orders_table = async () => {
    const ordersQuery = `DROP TABLE IF EXISTS "orders" cascade;
  CREATE TABLE IF NOT EXISTS "orders" (
    "id" SERIAL PRIMARY KEY,
    "code" uuid UNIQUE NOT NULL,
    "user_id" int NOT NULL,
    "order_status" varchar,
    "price" decimal(9,4),
    "created_at" timestamp
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
    "price" decimal(8,4)
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
    "created_at" timestamp,
    "expired_at" timestamp
  );`;

    return runSetupQuery('coupon_codes', couponCodesQuery);
};

const setup = (): void => {
    console.log('\x1b[36m%s\x1b[0m', 'ℹ Started database (re)structuring...');

    Promise.all([
        create_countries_table(),
        create_product_categories_table(),
        create_product_specs_table(),
        create_product_options_table(),
        create_product_images_table(),
        create_products_table(),
        create_order_items_table(),
        create_orders_table(),
        create_users_table(),
        create_coupon_codes_table(),
    ])
        .then(() => {
            console.log('\x1b[36m%s\x1b[0m', 'ℹ Database (re)structuring complete!');
        })
        .catch((err) => console.log(err));
};

setup();
