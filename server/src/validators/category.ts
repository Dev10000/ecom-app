import { body } from 'express-validator';

export default [body('title').trim().notEmpty().withMessage('Title is a required field.').isAlpha('en-GB')];
