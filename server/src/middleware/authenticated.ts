/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const authenticated = (req: Request, res: Response, next: NextFunction) => {
    const handler = passport.authenticate('jwt', { session: false });
    handler(req, res, next);
};

export default authenticated;
