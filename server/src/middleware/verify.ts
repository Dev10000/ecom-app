/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export default class Verify {
    private static adminCheck = (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IUserModel;
        return !user || !user.is_admin ? res.status(403).json({ status: 'error', data: 'Access denied!' }) : next();
    };

    static isUser = (req: Request, res: Response, next: NextFunction) => {
        const handler = passport.authenticate('jwt', { session: false });
        return handler(req, res, next);
    };

    static isUserOrGuest = (req: Request, res: Response, next: NextFunction) => {
        const handler = passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err) return next(err);
            if (user) req.user = user;
            return next();
        });

        return handler(req, res, next);
    };

    static isGuest = (req: Request, res: Response, next: NextFunction) => {
        const handler = passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err) return next(err);
            if (user) return res.status(403).json({ status: 'error', data: 'Already authenticated!' });
            return next();
        });

        return handler(req, res, next);
    };

    static isAdmin = [Verify.isUser, Verify.adminCheck];
}
