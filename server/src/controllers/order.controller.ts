import { Request, Response } from 'express';
import QB from '../database/QB';
import Order from '../models/Order';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return QB(Order)
        .get()
        .then((orders) => {
            return res.status(200).json({ status: 'success', data: orders });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Order.find<IOrderModel>(Number(id))
        .then((order) => {
            if (order.id) {
                return res.status(200).json({ status: 'success', data: order });
            }
            return res.status(404).json({ status: 'error', data: 'Resource not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Place order | Create a order)');
};
