import fs from 'fs';
import { Request, Response } from 'express';
import QueryBuilder from '../database/QueryBuilder';
import Country from '../models/Country';
import ProductCategory from '../models/ProductCategory';

const STATIC_COUNTRIES_PATH = `${__dirname}/../../../client/src/utils/countries.json`;
const STATIC_CATEGORIES_PATH = `${__dirname}/../../../client/src/utils/categories.json`;

export const exportCountries = async (req: Request, res: Response): Promise<Response> => {
    return QueryBuilder(Country)
        .select('id', 'name')
        .orderBy('name')
        .get()
        .then((countries) => {
            try {
                fs.writeFileSync(STATIC_COUNTRIES_PATH, JSON.stringify(countries), 'utf-8');
                return res.status(200).json({ status: 'success', data: 'File successfully written!' });
            } catch (error) {
                return res.status(500).json({ status: 'error', data: error.message });
            }
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const exportCategories = async (req: Request, res: Response): Promise<Response> => {
    return QueryBuilder(ProductCategory)
        .select('id', 'title', 'slug', 'parent_id')
        .get()
        .then((categories) => {
            try {
                fs.writeFileSync(STATIC_CATEGORIES_PATH, JSON.stringify(categories), 'utf-8');
                return res.status(200).json({ status: 'success', data: 'File successfully written!' });
            } catch (error) {
                return res.status(500).json({ status: 'error', data: error.message });
            }
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
