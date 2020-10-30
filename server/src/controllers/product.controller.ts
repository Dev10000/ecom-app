import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Get all products | filter them if query exists)');
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Get a single product)');
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Create a product)');
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Edit single product)');
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Delete a single product)');
};
