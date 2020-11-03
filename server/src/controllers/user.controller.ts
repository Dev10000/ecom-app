import { Request, Response } from 'express';
import UserModel from '../models/User';

const User = new UserModel();

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    return User.all()
        .then((users) => {
            return res.status(200).json({ status: 'success', data: users });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const editUser = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Edit single user)');
};

export const getUserOrders = async (req: Request, res: Response): Promise<Response> => {
    return res.send(' (Get all of the users orders | filter them if query exists)');
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    console.log(req.params);
    return User.where('id', '=', Number(id))
        .first()
        .then((user) => {
            console.log(user);
            return res.status(200).json({ status: 'success', data: user });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
