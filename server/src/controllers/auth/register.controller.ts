import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../../models/User';
import hashPassword from './utils';

type passwordConfirmation = { passwordConfirmation?: string };

const register = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    const reqData = req.body as Partial<IUserModel> & passwordConfirmation;

    // hashing password
    if (reqData.password) {
        reqData.password = hashPassword(reqData.password);
    }

    if (reqData.passwordConfirmation) {
        delete reqData.passwordConfirmation;
    }

    return User.create<IUserModel>(reqData)
        .save()
        .then((user) => res.status(201).json({ status: 'success', data: { ...user, password: '******' } })) // temporary password obfuscation
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export default register;
