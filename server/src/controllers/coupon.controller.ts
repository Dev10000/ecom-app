import { Request, Response } from 'express';
import QB from '../database/QB';
import CouponCode from '../models/CouponCode';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return QB(CouponCode)
        .get()
        .then((coupons) => {
            return res.status(200).json({ status: 'success', data: coupons });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return CouponCode.find<ICouponCodeModel>(Number(id))
        .then((coupon) => {
            if (coupon.id) {
                return res.status(200).json({ status: 'success', data: coupon });
            }
            return res.status(404).json({ status: 'error', data: 'Resource not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    return CouponCode.create<ICouponCodeModel>(req.body as Partial<ICouponCode>)
        .save()
        .then((coupon) => res.status(201).json({ status: 'success', data: coupon }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const coupon = (await CouponCode.find(Number(id))) as CouponCode;

    if (!coupon.id) {
        return res.status(404).json({ status: 'error', data: 'Coupon not found!' });
    }

    Object.assign(coupon, req.body as ICouponCode);

    return coupon
        .save()
        .then((updCoupon) => res.status(200).json({ status: 'success', data: updCoupon }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    return QB(CouponCode)
        .where('id', Number(id))
        .delete()
        .then(() => {
            return res.status(200).json({ status: 'success', data: null });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
