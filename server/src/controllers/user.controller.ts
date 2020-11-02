import { Request, Response } from 'express';
import User from '../models/User';

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Get all users)');
};

export const editUser = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Edit single user)');
};

export const getUserOrders = async (req: Request, res: Response): Promise<Response> => {
    return res.send(' (Get all of the users orders | filter them if query exists)');
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    return User.findById(Number(id))
        .then((user) => res.status(200).json({ status: 'success', data: user }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const saveUser = async (req: Request, res: Response): Promise<Response> => {
    const { email, password, first_name, last_name, address, city, country_id, postal_code, phone_number } = req.body;

    const newUser = new User(
        email,
        password,
        first_name,
        last_name,
        address,
        city,
        Number(country_id),
        postal_code,
        phone_number,
    );

    return newUser
        .save()
        .then((user) => res.status(201).json({ status: 'success', data: user }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
