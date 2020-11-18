import { Request, Response, NextFunction } from 'express';

let requestCounter = 0;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line no-plusplus
    console.log(new Date(), 'Request', ++requestCounter, req.method, req.url);
    next();
};

export default requestLogger;
