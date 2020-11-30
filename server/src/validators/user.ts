import { query } from 'express-validator';
// import QueryBuilder from '../database/QueryBuilder';
// import User from '../models/User';

// export default [
//     body('email')
//         .trim()
//         .notEmpty()
//         .withMessage('Email address is a required field.')
//         .isEmail()
//         .withMessage('Chosen Email is not a valid email address.')
//         .custom(async (value) => {
//             return QueryBuilder(User)
//                 .where('email', value)
//                 .first()
//                 .then((user) => {
//                     if (user.id) return Promise.reject(new Error('Email already taken.'));
//                     return true;
//                 });
//         }),

//     body('password').trim().notEmpty().isLength({ min: 6, max: 250 }).withMessage('Password can be 6 - 250 characters'),

//     body('passwordConfirmation')
//         .trim()
//         .notEmpty()
//         .custom((value, { req }) => {
//             if (value !== req.body.password) throw new Error('Password confirmation field must match password field.');
//             return true;
//         })
//         .isLength({ min: 6, max: 250 })
//         .withMessage('Invalid Password confirmation field.'),

//     body('first_name')
//         .trim()
//         .notEmpty()
//         .withMessage('First name is a required field.')
//         .isLength({ min: 3, max: 30 })
//         .withMessage('First name can be 3 - 30 characters')
//         .escape(),

//     body('last_name')
//         .trim()
//         .notEmpty()
//         .withMessage('Last name is a required field.')
//         .isLength({ min: 3, max: 30 })
//         .withMessage('Last name can be 3 - 30 characters')
//         .escape(),

// We will need these where we update the user information.
// body('address')
//     .trim()
//     .isLength({ max: 100 })
//     .withMessage('The maximum length of a city is 100 characters')
//     .escape(),

// body('city')
//     .trim()
//     .notEmpty()
//     .withMessage('City is a required field.')
//     .isLength({ min: 3, max: 40 })
//     .withMessage('City can be 3 - 40 characters')
//     .escape(),

// body('postal_code')
//     .trim()
//     .notEmpty()
//     .withMessage('Postal Code is a required field.')
//     .isLength({ min: 2, max: 30 })
//     .withMessage('Postal Code can be 2 - 30 characters')
//     .isPostalCode('any')
//     .escape(),

// body('phone_number')
//     .trim()
//     .notEmpty()
//     .withMessage('Mobile Phone Number is a required field.')
//     .isMobilePhone('fi-FI')
//     .withMessage('Invalid Mobile Phone Number')
//     .escape(),
// ];

// eslint-disable-next-line import/prefer-default-export
export const userQuery = [
    query('page').optional().isInt().withMessage('page must be an integer.').toInt(),
    query('items').optional().isInt().withMessage('page must be an integer.').toInt(),
];
