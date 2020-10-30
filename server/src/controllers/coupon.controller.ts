import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Get all coupon codes)');
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Create a coupon)');
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Edit single coupon)');
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Delete a single coupon)');
};
