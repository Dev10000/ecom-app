import { Request, Response } from 'express';
import QB from '../database/QB';
import User from '../models/User';
import hashPassword from './auth/utils';

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    return QB(User)
        .get()
        .then((users) => {
            return res.status(200).json({ status: 'success', data: users });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const editUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const reqData = req.body as Partial<IUserModel>;

    // TODO: !! make sure that the given user is the authenticated user !!
    const user = (await User.find(Number(id))) as User;

    if (!user.id) {
        return res.status(404).json({ status: 'error', data: 'Cannot find user with given id!' });
    }

    Object.assign(user, reqData);

    // hashing password
    if (reqData.password) {
        reqData.password = hashPassword(reqData.password);
    }

    return user
        .save()
        .then((updUser) => res.status(200).json({ status: 'success', data: updUser }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getUserOrders = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    // TODO: !! make sure that the given user is the authenticated user !!
    const user = (await User.find(Number(id))) as User;

    if (!user.id) {
        return res.status(404).json({ status: 'error', data: 'Cannot find user with given id!' });
    }

    return user
        .orders()
        .then((orders) => {
            return res.status(200).json({ status: 'success', data: orders });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    // console.log(req.params);
    return User.find(Number(id))
        .then((user) => {
            console.log(user);
            return res.status(200).json({ status: 'success', data: user });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
