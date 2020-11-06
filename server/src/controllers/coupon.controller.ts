import { Request, Response } from 'express';
import Coupon from '../models/CouponCode';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return Coupon.qb()
        .get()
        .then((coupon) => {
            return res.status(200).json({ status: 'success', data: coupon });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    // console.log(req.params);
    return Coupon.qb()
        .where('id', Number(id))
        .first()
        .then((coupon) => {
            if (coupon.id) {
                return res.status(200).json({ status: 'success', data: coupon });
            }
            return res.status(404).json({ status: 'error', data: 'Resource not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    return Coupon.create(req.body as ICouponCode)
        .then((coupon) => res.status(201).json({ status: 'success', data: coupon }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const coupon = (await Coupon.qb().where('id', Number(id)).first()) as Coupon;

    if (!coupon.id) {
        return res.status(404).json({ status: 'error', data: 'Coupon not found!' });
    }

    Object.assign(coupon, req.body as ICouponCode);

    return coupon
        .store()
        .then((updCoupon) => res.status(200).json({ status: 'success', data: updCoupon }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
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
