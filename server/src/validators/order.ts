import { body, query } from 'express-validator';

export default [
    body('order_items').isArray().notEmpty(),
    // .custom((value) => {
    //     if (!Array.isArray(value)) return Promise.reject(new Error('Order Items should be an array.'));
    //     if (value.length < 1) return Promise.reject(new Error('Order Items cannot be empty.'));
    //     return true;
    // }),
    body('coupon_code_id').optional(), // TODO: check if it exists and it's valid... ?
];

export const orderQuery = [
    query('page').optional().isInt().withMessage('page must be an integer.').toInt(),
    query('items').optional().isInt().withMessage('page must be an integer.').toInt(),
];
