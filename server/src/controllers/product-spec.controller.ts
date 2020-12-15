import { Request, Response } from 'express';
// import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import ProductSpec from '../models/ProductSpec';
import ProductSpecView from '../models/ProductSpecView';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    const { page, items } = req.query;
    return QueryBuilder(ProductSpec)
        .paginate(Number(page) || 1, Number(items) || 1000)
        .get()
        .then((coupons) => {
            return res.status(200).json({ status: 'success', data: coupons });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getAllByOptionsId = async (req: Request, res: Response): Promise<Response> => {
    const { options_id } = req.params;

    return QueryBuilder(ProductSpec)
        .select('DISTINCT ON (value)*')
        .where('product_options_id', options_id)
        .get()
        .then((specs) => {
            if (specs) {
                return res.status(200).json({ status: 'success', data: specs });
            }
            return res.status(404).json({ status: 'error', data: 'Product specification not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingleByProductId = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return QueryBuilder(ProductSpecView)
        .where('product_id', id)
        .first()
        .then((spec) => {
            if (spec) {
                // delete spec.updated_at;
                // delete spec.created_at;
                return res.status(200).json({ status: 'success', data: spec });
            }
            return res.status(404).json({ status: 'error', data: 'Product specification not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingleById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return ProductSpec.find<IProductSpec>(id)
        .then((spec) => {
            if (spec) {
                return res.status(200).json({ status: 'success', data: spec });
            }
            return res.status(404).json({ status: 'error', data: 'Product specification not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
