import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Get all categories)');
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Create a category)');
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Edit single category)');
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Delete a single category)');
};

export const listProducts = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(List products belonging to a category)');
};
