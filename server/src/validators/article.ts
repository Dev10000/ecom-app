import { body } from 'express-validator';

export default [
    body('title').trim().notEmpty().withMessage('Title is a required field.'),
    body('slug').trim().optional(), // must be also unique in articles
    body('featured_image').trim().notEmpty().withMessage('Featured image is a required field.'),
    body('body').notEmpty().withMessage('Article body is a required field.'),
];
