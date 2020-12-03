import { body } from 'express-validator';

export default [body('value').trim().notEmpty().withMessage('Value is a required field.')];
