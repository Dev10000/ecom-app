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

const seedData = async () => {
    console.log('\x1b[36m%s\x1b[0m', 'ℹ Started database seeding...');

    await Promise.all([countriesSeeder(), usersSeeder()]);

    console.log('\x1b[36m%s\x1b[0m', 'ℹ Database Seeding complete!');
};

seedData();
