import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import Product from '../models/Product';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return QueryBuilder(Product)
        .get()
        .then((products) => {
            return res.status(200).json({ status: 'success', data: products });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    // console.log(req.params);
    return Product.find<IProductModel>(id)
        .then((product) => {
            if (product && product.id) {
                return res.status(200).json({ status: 'success', data: product });
            }
            return res.status(404).json({ status: 'error', data: 'Resource not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    return Product.create<IProductModel>(req.body as Partial<IProduct>)
        .save()
        .then((product) => res.status(201).json({ status: 'success', data: product }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Product.find<IProductModel>(id)
        .then((product) => {
            if (!product) {
                return res.status(404).json({ status: 'error', data: 'Coupon not found!' });
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

            Object.assign(product, req.body as IProduct);

            return product
                .save()
                .then((updatedProduct) => res.status(200).json({ status: 'success', data: updatedProduct }))
                .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
        })
        .catch((e) => Promise.reject(e.message));
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Product.find<IProductModel>(id).then((product) => {
        if (!product) {
            return res.status(404).json({ status: 'error', data: 'Product not found!' });
        }

        return QueryBuilder(Product)
            .where('id', id)
            .delete()
            .then((response) => {
                if (response) {
                    return res.status(200).json({ status: 'success', data: 'Product successfully removed.' });
                }
                return res.status(500).json({ status: 'error', data: 'Error in removing product' });
            })
            .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
    });
};
