import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

// https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const errorHandler = (err: ErrorRequestHandler, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) return next(err);

    return res.status(500).json({ error: err });
};

export default errorHandler;

// import express, { NextFunction, Request, Response } from "express";
// catch SyntaxErrors like when receiving ill-formed json
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     if (err instanceof SyntaxError) {
//         const error = { status: undefined, type: undefined, ...err };
//         if (error.status === 400 && "body" in err) {
//             console.error(error.type);
//             res.status(400).json({ error: "Bad JSON.", message: error.message, type: error.type });
//         }
//         else { next(); }
//     }
// });
