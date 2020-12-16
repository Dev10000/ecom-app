/* eslint-disable react-hooks/rules-of-hooks */
import fs from 'fs';
import { useDBSetup, csvImport } from './utils';

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

const productImagesSeeder = async (): Promise<void> => {
    const filePath = await fs.createReadStream('./src/database/data/images.csv');
    await csvImport(filePath, 'product_images');
};

const productOptionsSeeder = async (): Promise<void> => {
    const filePath = await fs.createReadStream('./src/database/data/product_options.csv');
    await csvImport(filePath, 'product_options');
};

const productSpecsSeeder = async (): Promise<void> => {
    const filePath = await fs.createReadStream('./src/database/data/product_specs.csv');
    await csvImport(filePath, 'product_specs');
};

const setValsForCSVImports = async (): Promise<void> => {
    const setValsForCSVImportsSQL = await fs.readFileSync('./src/database/data/setvalsForCSVImports.sql').toString();
    await runSetupQuery('SET VALS FOR CSV IMPORTS', setValsForCSVImportsSQL);
};

const truncateBeforeCSVImports = async (): Promise<void> => {
    const setValsForCSVImportsSQL = await fs
        .readFileSync('./src/database/data/truncate_before_csv_imports.sql')
        .toString();
    await runSetupQuery('TRUNCATE BEFORE CSV IMPORTS', setValsForCSVImportsSQL);
};

const setValues = async () => {
    await setValsForCSVImports();
};

const seedData = async () => {
    console.log('\x1b[36m%s\x1b[0m', 'ℹ Started database seeding...');
    let fulfilled = 0;
    let rejected = 0;
    await truncateBeforeCSVImports();
    await Promise.allSettled([
        countriesSeeder(),
        usersSeeder(),
        productCategoriesSeeder(),
        productsSeeder(),
        productImagesSeeder(),
        productOptionsSeeder(),
        productSpecsSeeder(),
    ]).then((results) =>
        results.forEach((result) => {
            if (result.status === 'fulfilled') {
                fulfilled += 1;
            }
            if (result.status === 'rejected') {
                rejected += 1;
            }
        }),
    );
    await setValues();
    console.log('\x1b[36m%s\x1b[0m', 'ℹ Database Seeding complete!');
    if (rejected === 0) {
        console.log('\x1b[36m%s\x1b[0m\x1b[32m%s\x1b[0m', `ℹ Final Results:`, ` √ All Good no problems`);
    } else {
        console.log('\x1b[36m%s\x1b[0m', `ℹ Final Results:`);
        console.log('\x1b[32m%s\x1b[0m', `√ Number of fulfilled seeds: ${fulfilled}`);
        console.log('\x1b[31m%s\x1b[0m', `× Number of rejected seeds: ${rejected}`);
    }
};

seedData();
