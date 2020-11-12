import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import config from '../../config';
import QB from '../../database/QB';

function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRATION_TIME,
    });
}

const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    const ret = await QB<IUserModel>(User)
        .where('email', email)
        .first()
        .then(async (user) => {
            if (!user.id) {
                return res.status(401).json({ status: 'error', data: 'Email or password is incorrect!' });
            }

            const match = await User.checkPasswords(user.password, password);
            if (!match) return res.status(401).json({ status: 'error', data: 'Email or password is incorrect!' });

            return res.status(200).json({ status: 'success', data: { token: createToken(user) } });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));

    return ret;
};

export default login;
