import { body, query } from 'express-validator';

export default [
    body('title').trim().notEmpty().withMessage('title is a required field.'),

    body('slug') // todo: slug format checking
        .trim()
        .notEmpty()
        .withMessage('slug is a required field.'),

    body('description').trim().notEmpty().withMessage('description is a required field.'),

    body('price')
        .trim()
        .notEmpty()
        .withMessage('price is a required field.')
        .isNumeric()
        .withMessage('price must be a numeric value.'),

    body('weight').trim().optional().isNumeric().withMessage('weight must be a numeric value.'),

    body('package_size').optional(),

    body('discount').trim().optional().isNumeric().withMessage('discount must be a numeric value.'),

    body('product_category_id')
        .trim()
        .notEmpty()
        .withMessage('product_category_id is a required field.')
        .isInt({ gt: 0 })
        .withMessage('product_category_id must be a positive integer.'),

    body('stock_qty')
        .trim()
        .notEmpty()
        .withMessage('stock_qty is a required field.')
        .isInt()
        .withMessage('stock_qty must be an integer.'),
];

export const productQuery = [
    query('page').optional().isInt().withMessage('page must be an integer.').toInt(),
    query('items').optional().isInt().withMessage('page must be an integer.').toInt(),
];
