import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Get all orders)');
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Get a single order)');
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Place order | Create a order)');
};
