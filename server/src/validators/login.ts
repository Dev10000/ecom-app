import { body } from 'express-validator';

export default [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email address is a required field.')
        .isEmail()
        .withMessage('Given Email is not a valid email address.'),

    body('password').trim().notEmpty().withMessage('Password is a required field.'),
];
