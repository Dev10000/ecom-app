import { Request, Response } from 'express';
import QB from '../database/QB';
import ProductCategory from '../models/ProductCategory';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return QB(ProductCategory)
        .orderBy('title')
        .get()
        .then((categories) => {
            return res.status(200).json({ status: 'success', data: categories });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    return ProductCategory.create(req.body as Partial<ProductCategory>)
        .save()
        .then((category) => res.status(201).json({ status: 'success', data: category }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const productCategory = (await ProductCategory.find(Number(id))) as ProductCategory;

    if (!productCategory.id) {
        return res.status(404).json({ status: 'error', data: 'Product Category not found!' });
    }

    Object.assign(productCategory, req.body as IProductCategory);

    return productCategory
        .save()
        .then((updCategory) => res.status(200).json({ status: 'success', data: updCategory }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const productCategory = (await ProductCategory.find(Number(id))) as ProductCategory;

    if (!productCategory.id) {
        return res.status(404).json({ status: 'error', data: 'Product Category not found!' });
    }

    return QB(ProductCategory)
        .where('id', Number(id))
        .delete()
        .then(() => {
            return res.status(200).json({ status: 'success', data: null });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const listProducts = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const productCategory = (await ProductCategory.find(Number(id))) as ProductCategory;

    if (!productCategory.id) {
        return res.status(404).json({ status: 'error', data: 'Product Category not found!' });
    }

    return productCategory
        .products()
        .then((products) => {
            return res.status(200).json({ status: 'success', data: products });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
