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
    return Country.create(req.body as ICountry)
        .then((country) => res.status(201).json({ status: 'success', data: country }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const country = (await Country.qb().where('id', Number(id)).first()) as Country;

    if (!country.id) {
        return res.status(404).json({ status: 'error', data: 'Country not found!' });
    }

    Object.assign(country, req.body as ICountry);

    return country
        .store()
        .then((updCountry) => res.status(200).json({ status: 'success', data: updCountry }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    // copied from edit() to check first if a country with given id exists, but is repetition…
    const country = (await Country.qb().where('id', Number(id)).first()) as Country;
    if (!country.id) {
        return res.status(404).json({ status: 'error', data: 'Country not found!' });
    }

    return Country.qb()
        .where('id', Number(id))
        .delete()
        .then(() => {
            return res.status(200).json({ status: 'success', data: null });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
