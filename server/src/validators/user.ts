import { query } from 'express-validator';

// eslint-disable-next-line import/prefer-default-export
export const userQuery = [
    query('page').optional().isInt().withMessage('page must be an integer.').toInt(),
    query('items').optional().isInt().withMessage('page must be an integer.').toInt(),
];
