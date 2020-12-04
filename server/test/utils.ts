import jwt from 'jsonwebtoken';
import config from '../src/config';

// https://www.restapitutorial.com/httpstatuscodes.html
export const statuses = [
    {
        code: 200,
        status: 'OK',
    },
    {
        code: 201,
        status: 'Created',
    },
    {
        code: 204,
        status: 'No Content',
    },
    {
        code: 401,
        status: 'Unauthorized',
    },
    {
        code: 403,
        status: 'Forbidden',
    },
    {
        code: 404,
        status: 'Not Found',
    },
    {
        code: 422,
        status: 'Unprocessable Entity',
    },
    {
        code: 500,
        status: 'Internal Server Error',
    },
];

export const authenticate = (id: number, email: string): string => {
    return jwt.sign({ id, email }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRATION_TIME,
    });
};

export const statusCode = (code: number): string => {
    const httpStatus = statuses.find((status) => status.code === code);
    return httpStatus ? httpStatus.status : 'Unknown';
};
