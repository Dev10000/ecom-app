import { Request, Response } from 'express';
import QB from '../database/QB';
import Product from '../models/Product';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return QB(Product)
        .get()
        .then((products) => {
            return res.status(200).json({ status: 'success', data: products });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    // console.log(req.params);
    return Product.find<IProductModel>(Number(id))
        .then((product) => {
            if (product.id) {
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

    const product = (await Product.find(Number(id))) as IProductModel;

    if (!product.id) {
        return res.status(404).json({ status: 'error', data: 'Product not found!' });
    }

    Object.assign(product, req.body as Partial<IProduct>);

    return product
        .save()
        .then((updProduct) => res.status(200).json({ status: 'success', data: updProduct }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    return QB(Product)
        .where('id', Number(id))
        .delete()
        .then(() => {
            return res.status(200).json({ status: 'success', data: null });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
