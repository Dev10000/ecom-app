import { body } from 'express-validator';

export default [
    body('name').trim().notEmpty().withMessage('Country name is a required field.').escape(),

    body('alpha2')
        .trim()
        .isLength({ min: 2, max: 2 })
        .isAlpha()
        .isUppercase()
        .withMessage('alpha2 requires 2 capital letters.')
        .escape(),

    body('alpha3')
        .trim()
        .isLength({ min: 3, max: 3 })
        .isAlpha()
        .isUppercase()
        .withMessage('alpha3 requires 3 capital letters.')
        .escape(),

    body('code')
        .trim()
        .isLength({ min: 2, max: 2 })
        .isAlpha()
        .isUppercase()
        .withMessage('code requires 2 capital letters.')
        .escape(),

    body('iso_3166_2')
        .trim()
        .isLength({ min: 2, max: 2 })
        .isAlpha()
        .isUppercase()
        .withMessage('iso_3166_2 requires 2 capital letters.')
        .escape(),
];
