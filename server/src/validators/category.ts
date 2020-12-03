import { body } from 'express-validator';

export default [
    body('title').trim().notEmpty().withMessage('Title is a required field.'),
    body('parent_id').optional().isInt().withMessage('Parent ID is integer'), // TODO: Should exist in categories!!
];
