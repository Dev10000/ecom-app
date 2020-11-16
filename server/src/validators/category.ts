import { body } from 'express-validator';

export default [
    body('title').trim().notEmpty().withMessage('Title is a required field.'),
    body('parent_id')
        .notEmpty()
        .trim()
        .withMessage('Parent ID is a required field.')
        .isInt()
        .withMessage('Parent ID is integer'),
];
