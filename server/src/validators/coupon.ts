import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validCouponCreate = [
    body('code').trim().notEmpty().withMessage('Code is a required field.'),

    body('quantity').trim().notEmpty().withMessage('Quantity is a required field.').isInt(),

    body('expired_at').trim().notEmpty().withMessage('Expiry date is a required field.').isDate(),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];

export const validCouponGetSingle = [
    param('id').trim().notEmpty().withMessage('Param is a required field.').isInt(),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];

export const validCouponEdit = [
    param('id').trim().notEmpty().withMessage('Param is a required field.').isInt(),

    body('code').trim().notEmpty().withMessage('Code is a required field.'),

    // body('quantity').trim().notEmpty().withMessage('Quantity is a required field.').isInt(),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];

export const validCouponDelete = [
    param('id').trim().notEmpty().withMessage('Param is a required field.').isInt(),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next();
    },
];
