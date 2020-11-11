import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

// https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const errorHandler = (err: ErrorRequestHandler, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);

    return res.status(500).json({ error: err });
};

export default errorHandler;
