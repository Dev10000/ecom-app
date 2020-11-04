import { Request, Response } from 'express';
import CountryModel from '../models/Country';

const Country = new CountryModel();

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return Country.all()
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
    return res.send('(Delete a single country)');
};
