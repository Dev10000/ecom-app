import { body } from 'express-validator';

export default [
    body('code').trim().notEmpty().withMessage('Code is a required field.'),
    body('quantity').trim().notEmpty().withMessage('Quantity is a required field.').isInt(),
    body('expired_at').trim().notEmpty().withMessage('Expiry date is a required field.').isDate(),
];
