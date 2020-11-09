import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export default [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email address is a required field.')
        .isEmail()
        .withMessage('Given Email is not a valid email address.'),

    body('password').trim().notEmpty().withMessage('Password is a required field.'),

    (req: Request, res: Response, next: NextFunction): unknown => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
        return true;
    },
];
