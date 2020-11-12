import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import config from '../../config';
import QueryBuilder from '../../database/QueryBuilder';

function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRATION_TIME,
    });
}

const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    // TODO: Perform better validation here
    if (!email) return res.status(400).json({ status: 'error', data: 'Email required!' });
    if (!password) return res.status(400).json({ status: 'error', data: 'Password required!' });

    const ret = await QueryBuilder<IUserModel>(User)
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
