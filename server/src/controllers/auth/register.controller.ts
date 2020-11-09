import { Request, Response } from 'express';
import User from '../../models/User';
import hashPassword from './utils';

const register = async (req: Request, res: Response): Promise<Response> => {
    const reqData = req.body as Partial<IUserModel>;

    // hashing password
    if (reqData.password) {
        reqData.password = hashPassword(reqData.password);
    }

    return User.create<IUserModel>(reqData)
        .save()
        .then((user) => res.status(201).json({ status: 'success', data: user }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export default register;
