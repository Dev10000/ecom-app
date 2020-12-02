import { body } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import Country from '../models/Country';

// Custom validator checks if value exists in the db
const checkIfExists = async (column: string, value: string, id?: number): Promise<boolean | ErrorEvent> => {
    return QueryBuilder(Country)
        .where(column, value)
        .where('id', '<>', id || -1)
        .get()
        .then((country) => {
            if (country && country.length)
                return Promise.reject(new Error(`A record with this ${column} already exist.`));
            return true;
        });
};

export default [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Country name is a required field.')
        .custom(async (value, { req }) => {
            return req.params && req.params.id
                ? checkIfExists('name', value, req.params.id)
                : checkIfExists('name', value);
        }),

    body('alpha2')
        .trim()
        .isLength({ min: 2, max: 2 })
        .withMessage('Length must be 2 characters.')
        .isAlpha()
        .withMessage('The characters must be letters.')
        .isUppercase()
        .withMessage('The letters must be uppercase.')
        .custom(async (value, { req }) => {
            return req.params && req.params.id
                ? checkIfExists('alpha2', value, req.params.id)
                : checkIfExists('alpha2', value);
        }),

    body('alpha3')
        .trim()
        .isLength({ min: 3, max: 3 })
        .withMessage('Length must be 3 characters.')
        .isAlpha()
        .withMessage('The characters must be letters.')
        .isUppercase()
        .withMessage('The letters must be uppercase.')
        .custom(async (value, { req }) => {
            return req.params && req.params.id
                ? checkIfExists('alpha3', value, req.params.id)
                : checkIfExists('alpha3', value);
        }),

    body('code')
        .trim()
        .isLength({ min: 1, max: 3 })
        .withMessage('Length must be between 1 and 3 digits.')
        .isNumeric()
        .withMessage('The code must be numeric.')
        .custom(async (value, { req }) => {
            return req.params && req.params.id
                ? checkIfExists('code', value, req.params.id)
                : checkIfExists('code', value);
        }),

    body('iso_3166_2')
        .trim()
        .isLength({ min: 2, max: 2 })
        .withMessage('Length must be 2 characters.')
        .isAlpha()
        .withMessage('The characters must be letters.')
        .isUppercase()
        .withMessage('The letters must be uppercase.')
        .custom(async (value, { req }) => {
            return req.params && req.params.id
                ? checkIfExists('iso_3166_2', value, req.params.id)
                : checkIfExists('iso_3166_2', value);
        }),

    body('region').optional(),
    body('region_code').optional().isNumeric().withMessage('The Region Code must be numeric.'),
    body('sub_region').optional(),
    body('sub_region_code').optional().isNumeric().withMessage('The Sub Region Code must be numeric.'),
    body('intermediate_region').optional(),
    body('intermediate_region_code')
        .optional()
        .isNumeric()
        .withMessage('The Intermediate Region Code must be numeric.'),
];
