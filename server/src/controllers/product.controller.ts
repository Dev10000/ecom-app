import { Request, Response } from 'express';
import ProductModel from '../models/Product';

const Product = new ProductModel();

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return Product.all()
        .then((products) => {
            return res.status(200).json({ status: 'success', data: products });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Get a single product)');
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Create a product)');
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Edit single product)');
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(Delete a single product)');
};
