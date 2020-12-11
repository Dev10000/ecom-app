import { body, query } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import User from '../models/User';

// Custom validator checks if value exists in the db
const checkIfExists = async (column: string, value: string, id?: number): Promise<boolean | ErrorEvent> => {
    return QueryBuilder(User)
        .where(column, value)
        .where('id', '<>', id || -1)
        .get()
        .then((user) => {
            if (user && user.length) return Promise.reject(new Error(`A record with this ${column} already exist.`));
            return true;
        });
};

export default [
    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Chosen Email is not a valid email address.')
        .custom(async (value, { req }) => {
            return req.params && req.params.id
                ? checkIfExists('email', value, req.params.id)
                : checkIfExists('email', value);
        }),

    body('first_name')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('First name can be 3 - 30 characters')
        .escape(),

    body('last_name')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Last name can be 3 - 30 characters')
        .escape(),

    body('address')
        .trim()
        .optional()
        .isLength({ max: 100 })
        .withMessage('The maximum length of a city is 100 characters')
        .escape(),

    body('city').trim().optional().isLength({ min: 3, max: 40 }).withMessage('City can be 3 - 40 characters').escape(),

    body('postal_code')
        .trim()
        .optional()
        .isLength({ min: 2, max: 30 })
        .withMessage('Postal Code can be 2 - 30 characters')
        // .isPostalCode('any') <- Seeded data not passing
        .escape(),

    body('phone_number')
        .trim()
        .optional()
        // .isMobilePhone('fi-FI').withMessage('Invalid Mobile Phone Number') <- Seeded data not passing
        .escape(),
];

// eslint-disable-next-line import/prefer-default-export
export const userQuery = [
    query('page').optional().isInt().withMessage('page must be an integer.').toInt(),
    query('items').optional().isInt().withMessage('page must be an integer.').toInt(),
];
