import { body } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import Product from '../models/Product';

export default [
    body('rating')
        .trim()
        .notEmpty()
        .withMessage('Rating is required.')
        .isInt({ min: 0, max: 5 })
        .withMessage('Invalid Rating value.'),
    body('product_id')
        .notEmpty()
        .withMessage('Product Id is a required field.')
        .custom(async (value) => {
            return QueryBuilder(Product)
                .where('id', value)
                .first()
                .then((product) => {
                    if (!product.id) return Promise.reject(new Error('Cannot find the reviewed product.'));
                    return true;
                });
        }),
    body('body').optional(),
];
