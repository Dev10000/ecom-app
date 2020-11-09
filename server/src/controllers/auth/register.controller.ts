import { Request, Response } from 'express';
import { genSaltSync, hashSync } from 'bcrypt';
import User from '../../models/User';
import config from '../../config';

function hashPassword(password: string): string {
    const salt = genSaltSync(config.SALT_ROUNDS);
    return hashSync(password, salt);
}

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
