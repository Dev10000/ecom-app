import { Request, Response } from 'express';
import OrderModel from '../models/Order';

const Order = new OrderModel();

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return Order.all()
        .then((orders) => {
            return res.status(200).json({ status: 'success', data: orders });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Get a single order)');
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Place order | Create a order)');
};
