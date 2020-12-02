import { body, query } from 'express-validator';

export default [
    // body('code')
    //     .trim()
    //     .notEmpty()
    //     .withMessage('code is a required field.')
    //     .isUUID()
    //     .withMessage('code must be a valid UUID'),

    body('user_id')
        .trim()
        .notEmpty()
        .withMessage('user_id is a required field.')
        .isInt({ gt: 0 })
        .withMessage('user_id must be a positive integer.'),

    body('order_status')
        .trim()
        .notEmpty()
        .withMessage('order_status is a required field.')
        .matches(/Pending|Confirmed|Dispatched|Completed|Canceled/)
        .withMessage('order_status must be one of Pending|Confirmed|Dispatched|Completed|Canceled.'),

    body('price')
        .trim()
        .notEmpty()
        .withMessage('price is a required field.')
        .isNumeric()
        .withMessage('price must be a numeric value.'),
];

export const orderQuery = [
    query('page').optional().isInt().withMessage('page must be an integer.').toInt(),
    query('items').optional().isInt().withMessage('page must be an integer.').toInt(),
];
