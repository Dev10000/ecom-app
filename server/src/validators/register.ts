import { body } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import User from '../models/User';

export default [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email address is a required field.')
        .isEmail()
        .withMessage('Chosen Email is not a valid email address.')
        .custom(async (value) => {
            return QueryBuilder(User)
                .where('email', value)
                .first()
                .then((user) => {
                    if (user.id) return Promise.reject(new Error('Email already taken.'));
                    return true;
                });
        }),

    body('password').trim().notEmpty().isLength({ min: 6, max: 250 }).withMessage('Password can be 6 - 250 characters'),

    body('passwordConfirmation')
        .trim()
        .notEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error('Password confirmation field must match password field.');
            return true;
        })
        .isLength({ min: 6, max: 250 })
        .withMessage('Invalid Password confirmation field.'),

    body('first_name')
        .trim()
        .notEmpty()
        .withMessage('First name is a required field.')
        .isLength({ min: 3, max: 30 })
        .withMessage('First name can be 3 - 30 characters')
        .escape(),

    body('last_name')
        .trim()
        .notEmpty()
        .withMessage('Last name is a required field.')
        .isLength({ min: 3, max: 30 })
        .withMessage('Last name can be 3 - 30 characters')
        .escape(),
];
