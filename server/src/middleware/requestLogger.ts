import { Request, Response, NextFunction } from 'express';
import config from '../config';

const { NODE_ENV } = config;

let requestCounter = 0;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    if (NODE_ENV !== 'testing') {
        console.log(new Date(), 'Request', (requestCounter += 1), req.method, req.url);
    }
    next();
};

export default requestLogger;
