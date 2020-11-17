/* eslint-disable react-hooks/rules-of-hooks */
import fs from 'fs';
import { useDBSetup } from './utils';

const { runSetupQuery } = useDBSetup(true);

const countriesSeeder = async (): Promise<void> => {
    const countriesSQL = await fs.readFileSync('./src/database/data/countries.sql').toString();
    await runSetupQuery('countries', countriesSQL);
};

const usersSeeder = async (): Promise<void> => {
    const usersSQL = await fs.readFileSync('./src/database/data/users.sql').toString();
    await runSetupQuery('users', usersSQL);
};

const productCategoriesSeeder = async (): Promise<void> => {
    const productCategoriesSQL = await fs.readFileSync('./src/database/data/product_categories.sql').toString();
    await runSetupQuery('product_categories', productCategoriesSQL);
};

const productsSeeder = async (): Promise<void> => {
    const productsSQL = await fs.readFileSync('./src/database/data/products.sql').toString();
    await runSetupQuery('products', productsSQL);
};

// const productImagesSeeder = async (): Promise<void> => {
//     const productImagesSQL = await fs.readFileSync('./src/database/data/product_images.sql').toString();
//     await runSetupQuery('product_images', productImagesSQL);
// };

const productOptionsSeeder = async (): Promise<void> => {
    const productOptionsSQL = await fs.readFileSync('./src/database/data/product_options.sql').toString();
    await runSetupQuery('product_options', productOptionsSQL);
};

const productSpecsSeeder = async (): Promise<void> => {
    const productSpecsSQL = await fs.readFileSync('./src/database/data/product_specs.sql').toString();
    await runSetupQuery('product_specs', productSpecsSQL);
};

const seedData = async () => {
    console.log('\x1b[36m%s\x1b[0m', 'ℹ Started database seeding...');

    await Promise.all([
        countriesSeeder(),
        usersSeeder(),
        productCategoriesSeeder(),
        productsSeeder(),
        // productImagesSeeder(),
        productOptionsSeeder(),
        productSpecsSeeder(),
    ]);

    console.log('\x1b[36m%s\x1b[0m', 'ℹ Database Seeding complete!');
};

seedData();
