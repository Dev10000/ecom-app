import { Request, Response } from 'express';
// import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import ProductOption from '../models/ProductOption';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return QueryBuilder(ProductOption)
        .get()
        .then((options) => {
            return res.status(200).json({ status: 'success', data: options });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    return ProductOption.find<IProductOption>(id)
        .then((option) => {
            if (option) {
                return res.status(200).json({ status: 'success', data: option });
            }
            return res.status(404).json({ status: 'error', data: 'Product option not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getAllByCategoryId = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    return ProductOption.find<IProductOption>(id)
        .then((option) => {
            if (option) {
                return res.status(200).json({ status: 'success', data: option });
            }
            return res.status(404).json({ status: 'error', data: 'Product option not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};