import { body } from 'express-validator';

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

    /*
    body('weight')
        .trim()
        .notEmpty()
        .withMessage('weight is a required field.')
        .isNumeric()
        .withMessage('weight must be a numeric value.'),

    body('package_size').trim().notEmpty().withMessage('package_size is a required field.'),

    body('discount')
        .trim()
        .notEmpty()
        .withMessage('discount is a required field.')
        .isNumeric()
        .withMessage('discount must be a numeric value.'),

    body('product_category_id')
        .trim()
        .notEmpty()
        .withMessage('product_category_id is a required field.')
        .isInt({ gt: 0 })
        .withMessage('product_category_id must be a positive integer.'),
    */

    body('stock_qty')
        .trim()
        .notEmpty()
        .withMessage('stock_qty is a required field.')
        .isInt()
        .withMessage('stock_qty must be an integer.'),
];