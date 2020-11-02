/* eslint-disable react-hooks/rules-of-hooks */
import fs from 'fs';
import { useDBSetup } from './utils';

const { runSetupQuery } = useDBSetup(true);

const countriesSeeder = async () => {
    const countriesSQL = await fs.readFileSync('./src/database/data/countries.sql').toString();
    runSetupQuery('countries', countriesSQL);
};

const usersSeeder = async () => {
    const usersSQL = await fs.readFileSync('./src/database/data/users.sql').toString();
    runSetupQuery('users', usersSQL);
};

const seedData = (): void => {
    console.log('\x1b[36m%s\x1b[0m', 'ℹ Started database seeding...');

    Promise.all([countriesSeeder(), usersSeeder()])
        .then(() => {
            console.log('\x1b[36m%s\x1b[0m', 'ℹ Database Seeding complete!');
        })
        .catch((err) => console.log(err));
};

seedData();
