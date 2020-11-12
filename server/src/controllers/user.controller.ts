import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import User from '../models/User';
import hashPassword from './auth/utils';

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    return QueryBuilder(User)
        .get()
        .then((users) => {
            const sanitizedUsers = users.map((u) => {
                u.password = '******'; // TODO: exclude password from the query with a select...
                return u;
            });
            return res.status(200).json({ status: 'success', data: sanitizedUsers });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const editUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return User.find<IUserModel>(id)
        .then((user) => {
            if (!user) return res.status(404).json({ status: 'error', data: 'User not found!' });

            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

            const reqData = req.body as Partial<IUserModel>;

            Object.assign(user, reqData);

            // hashing password
            if (reqData.password) {
                reqData.password = hashPassword(reqData.password);
            }

            return user
                .save()
                .then((updatedUser) =>
                    res.status(200).json({ status: 'success', data: User.create<IModel>(updatedUser) }),
                )
                .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
        })
        .catch((e) => Promise.reject(e.message));
};

export const getUserOrders = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    // TODO: !! make sure that the given user is the authenticated user !!
    return User.find<IUserModel>(id).then((user) => {
        if (!user) return res.status(404).json({ status: 'error', data: 'Cannot find user with given id!' });

        return user
            .orders()
            .then((orders) => {
                return res.status(200).json({ status: 'success', data: orders });
            })
            .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
    });
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return User.find<IUserModel>(id)
        .then((user) => {
            if (!user) return res.status(404).json({ status: 'error', data: 'Cannot find user with given id!' });
            return res.status(200).json({ status: 'success', data: user });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
