import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
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

    return Order.find<IOrderModel>(id)
        .then((order) => {
            if (!order) {
                return res.status(404).json({ status: 'error', data: 'Resource not found!' });
            }
            return res.status(200).json({ status: 'success', data: order });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    return Order.create<IOrderModel>(req.body as Partial<IOrder>)
        .save()
        .then((order) => res.status(201).json({ status: 'success', data: order }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
