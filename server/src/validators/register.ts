import { body } from 'express-validator';
import QB from '../database/QB';
import User from '../models/User';

//     country_id?: string;
//     city?: string;
//     postal_code?: string;
//     phone_number?: string;

export default [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email address is a required field.')
        .isEmail()
        .withMessage('Choosen Email is not a valid email address.')
        .custom(async (value) => {
            return QB(User)
                .where('email', value)
                .first()
                .then((user) => {
                    if (user) return Promise.reject(new Error('Email already taken.'));
                    return true;
                });
        }),

    body('password').trim().notEmpty().isLength({ min: 6, max: 250 }).withMessage('Invalid password.'),

    // body('confirm-password')
    //     .trim()
    //     .notEmpty()
    //     .isLength({ min: 6, max: 250 })
    //     .custom((value, { req }) => {
    //         if (value !== req.body.password) throw new Error('Password confirmation field must match password field.');
    //         return true;
    //     })
    //     .withMessage('Invalid Password confirmation field.'),

    body('first_name')
        .trim()
        .notEmpty()
        .withMessage('First name is a required field.')
        .isLength({ min: 2, max: 20 })
        .withMessage('Invalid name')
        .escape(),

    body('last_name')
        .trim()
        .notEmpty()
        .withMessage('Last name is a required field.')
        .isLength({ min: 2, max: 20 })
        .withMessage('Invalid name')
        .escape(),

    body('address').trim().isLength({ max: 100 }).withMessage('Invalid address').escape(),
];
