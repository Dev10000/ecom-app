import { Request, Response } from 'express';
import Coupon from '../models/CouponCode';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return Coupon.qb()
        .select('id', 'name')
        .orderBy('name')
        .get()
        .then((coupons) => {
            return res.status(200).json({ status: 'success', data: coupons });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Create a coupon)');
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Edit single coupon)');
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    return Coupon.qb()
        .where('id', Number(id))
        .delete()
        .then(() => {
            return res.status(200).json({ status: 'success', data: null });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
