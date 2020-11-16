import { body } from 'express-validator';

export default [
    body('name').trim().notEmpty().withMessage('Country name is a required field.'),

    body('alpha2')
        .trim()
        .isLength({ min: 2, max: 2 })
        .withMessage('Length must be 2 characters.')
        .isAlpha()
        .withMessage('The characters must be letters.')
        .isUppercase()
        .withMessage('The letters must be uppercase.'),

    body('alpha3')
        .trim()
        .isLength({ min: 3, max: 3 })
        .withMessage('Length must be 3 characters.')
        .isAlpha()
        .withMessage('The characters must be letters.')
        .isUppercase()
        .withMessage('The letters must be uppercase.'),

    body('code')
        .trim()
        .isLength({ min: 2, max: 2 })
        .withMessage('Length must be 2 characters.')
        .isAlpha()
        .withMessage('The characters must be letters.')
        .isUppercase()
        .withMessage('The letters must be uppercase.'),

    body('iso_3166_2')
        .trim()
        .isLength({ min: 2, max: 2 })
        .withMessage('Length must be 2 characters.')
        .isAlpha()
        .withMessage('The characters must be letters.')
        .isUppercase()
        .withMessage('The letters must be uppercase.'),
];
