import { body } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import Country from '../models/Country';

// Custom validator checks if value exists in the db
const checkIfExists = async (column: string, value: string): Promise<boolean | ErrorEvent> => {
    return QueryBuilder(Country)
        .where(column, value)
        .get()
        .then((country) => {
            if (country && country.length) return Promise.reject(new Error('Data already exist.'));
            return true;
        });
};

export default [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Country name is a required field.')
        .custom(async (value) => {
            return checkIfExists('name', value);
        }),

    body('alpha2')
        .trim()
        .isLength({ min: 2, max: 2 })
        .withMessage('Length must be 2 characters.')
        .isAlpha()
        .withMessage('The characters must be letters.')
        .isUppercase()
        .withMessage('The letters must be uppercase.')
        .custom(async (value) => {
            return checkIfExists('alpha2', value);
        }),

    body('alpha3')
        .trim()
        .isLength({ min: 3, max: 3 })
        .withMessage('Length must be 3 characters.')
        .isAlpha()
        .withMessage('The characters must be letters.')
        .isUppercase()
        .withMessage('The letters must be uppercase.')
        .custom(async (value) => {
            return checkIfExists('alpha3', value);
        }),

    body('code')
        .trim()
        .isLength({ min: 2, max: 2 })
        .withMessage('Length must be 2 characters.')
        .isAlpha()
        .withMessage('The characters must be letters.')
        .isUppercase()
        .withMessage('The letters must be uppercase.')
        .custom(async (value) => {
            return checkIfExists('code', value);
        }),

    body('iso_3166_2')
        .trim()
        .isLength({ min: 2, max: 2 })
        .withMessage('Length must be 2 characters.')
        .isAlpha()
        .withMessage('The characters must be letters.')
        .isUppercase()
        .withMessage('The letters must be uppercase.')
        .custom(async (value) => {
            return checkIfExists('iso_3166_2', value);
        }),
];
