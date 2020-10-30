import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config';

function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRATION_TIME,
    });
}

export const register = async (req: Request, res: Response): Promise<Response> => {
    return res.send('register');
};

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: 'error', data: 'Email and/or password missing!' });
    }

    const ret = await User.findByEmail(email)
        .then(async (user) => {
            if (!user) {
                return res.status(401).json({ status: 'error', data: 'User with the given email address not found!' });
            }

            const match = await User.checkPasswords(user.password, password);
            console.log(match);

            if (!match) return res.status(401).json({ status: 'error', data: 'Incorrect password!' });

            return res.status(200).json({ status: 'success', data: { token: createToken(user) } });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));

    return ret;
};
