import { Request, Response } from 'express';
import Product from '../models/Product';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return Product.qb()
        .get()
        .then((products) => {
            return res.status(200).json({ status: 'success', data: products });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    // console.log(req.params);
    return Product.qb()
        .where('id', Number(id))
        .first()
        .then((product) => {
            if (product.id) {
                return res.status(200).json({ status: 'success', data: product });
            }
            return res.status(404).json({ status: 'error', data: 'Resource not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    const {
        title,
        slug,
        description,
        price,
        weight,
        package_size,
        discount,
        product_category_id,
        stock_qty,
    } = req.body;

    return Product.create(
        title,
        slug,
        description,
        price,
        discount,
        stock_qty,
        weight,
        package_size,
        product_category_id,
    )
        .then((product) => res.status(201).json({ status: 'success', data: product }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const {
        title,
        slug,
        description,
        price,
        weight,
        package_size,
        discount,
        product_category_id,
        stock_qty,
    } = req.body;

    const productToUpdate = Product.qb().where('id', Number(id)).first() as Promise<Product>;

    return productToUpdate
        .then((product) => {
            product.title = title;
            product.slug = slug;
            product.description = description;
            product.price = price;
            product.weight = weight;
            product.package_size = package_size;
            product.discount = discount;
            product.product_category_id = product_category_id;
            product.stock_qty = stock_qty;

            return product
                .store()
                .then((updProduct) => res.status(200).json({ status: 'success', data: updProduct }))
                .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    return Product.qb()
        .where('id', Number(id))
        .delete()
        .then(() => {
            return res.status(200).json({ status: 'success', data: null });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
