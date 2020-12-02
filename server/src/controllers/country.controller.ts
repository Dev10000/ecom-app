import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import Country from '../models/Country';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return QueryBuilder(Country)
        .get()
        .then((countries) => {
            return res.status(200).json({ status: 'success', data: countries });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Country.find<ICountryModel>(id)
        .then((country) => {
            if (country) {
                return res.status(200).json({ status: 'success', data: country });
            }
            return res.status(404).json({ status: 'error', data: 'Country not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    return Country.create<ICountryModel>(req.body as ICountry)
        .save()
        .then((country) => res.status(201).json({ status: 'success', data: country }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Country.find<ICountryModel>(id)
        .then((country) => {
            if (!country) {
                return res.status(404).json({ status: 'error', data: 'Country not found!' });
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

            Object.assign(country, req.body as ICountry);

            return country
                .save()
                .then((updatedCountry) => res.status(200).json({ status: 'success', data: updatedCountry }))
                .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
        })
        .catch((e) => Promise.reject(e.message));
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Country.find<ICouponCodeModel>(id).then((country) => {
        if (!country) {
            return res.status(404).json({ status: 'error', data: 'Country not found!' });
        }

        return QueryBuilder(Country)
            .where('id', id)
            .delete()
            .then((response) => {
                console.log({ response });
                if (response) {
                    return res.status(200).json({ status: 'success', data: 'Country successfully removed.' });
                }
                return res.status(500).json({ status: 'error', data: 'Error in removing country' });
            })
            .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
    });
};
