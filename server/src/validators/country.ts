import { body } from 'express-validator';

export default [
    body('name').trim().notEmpty().withMessage('Country name is a required field.').escape(),
    body('alpha2').trim().isLength({ min: 2, max: 2 }).withMessage('alpha2 requires 2 characters.').escape(),
    body('alpha3').trim().isLength({ min: 3, max: 3 }).withMessage('alpha3 requires 3 characters.').escape(),
    body('code').trim().isLength({ min: 2, max: 2 }).withMessage('code requires 2 characters.').escape(),
    body('iso_3166_2').trim().isLength({ min: 2, max: 2 }).withMessage('iso_3166_2 requires 2 characters.').escape(),
];
