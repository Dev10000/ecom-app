/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export default class Verify {
    private static adminCheck = (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IUserModel;
        return !user || !user.isAdmin ? res.status(403).json({ status: 'error', data: 'Access denied!' }) : next();
    };

    static isUser = (req: Request, res: Response, next: NextFunction) => {
        const handler = passport.authenticate('jwt', { session: false });
        return handler(req, res, next);
    };

    static isAdmin = [Verify.isUser, Verify.adminCheck];
}
