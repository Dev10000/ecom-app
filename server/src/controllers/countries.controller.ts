import { Request, Response } from 'express';
import Country from '../models/Country';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return Country.qb()
        .select('id', 'name')
        .orderBy('name')
        .get()
        .then((countries) => {
            return res.status(200).json({ status: 'success', data: countries });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Create a country)');
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Edit single country)');
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    return Country.qb()
        .where('id', Number(id))
        .delete()
        .then(() => {
            return res.status(200).json({ status: 'success', data: null });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
