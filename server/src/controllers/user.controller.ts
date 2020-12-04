import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import User from '../models/User';
import hashPassword from './auth/utils';

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    const { page, items } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    return QueryBuilder(User)
        .paginate(Number(page) || 1, Number(items) || 25)
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

type passwordConfirmation = { passwordConfirmation?: string };

export const editUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return User.find<IUserModel>(id)
        .then((user) => {
            if (!user) return res.status(404).json({ status: 'error', data: 'User not found!' });

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

            Object.assign(user, reqData);

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

export const getUserArticles = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return User.find<IUserModel>(id).then((user) => {
        if (!user) return res.status(404).json({ status: 'error', data: 'Cannot find user with given id!' });

        return user
            .articles()
            .then((articles) => {
                return res.status(200).json({ status: 'success', data: articles });
            })
            .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
    });
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const loggedInUser = req.user as IUserModel;

    if (Number(loggedInUser.id) !== Number(id) && !loggedInUser.is_admin)
        return res.status(403).json({ status: 'error', data: 'Access denied!' });

    return User.find<IUserModel>(id)
        .then((user) => {
            if (!user) return res.status(404).json({ status: 'error', data: 'Cannot find user with given id!' });
            return res.status(200).json({ status: 'success', data: user });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
