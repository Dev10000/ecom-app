import jwt from 'jsonwebtoken';
import config from '../src/config';

// eslint-disable-next-line import/prefer-default-export
export const authenticate = (id: number, email: string): string => {
    return jwt.sign({ id, email }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRATION_TIME,
    });
};
