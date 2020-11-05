import { Request, Response } from 'express';
import Order from '../models/Order';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return Order.qb()
        .get()
        .then((orders) => {
            return res.status(200).json({ status: 'success', data: orders });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    // console.log(req.params);
    return Order.qb()
        .where('id', '=', Number(id))
        .first()
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
