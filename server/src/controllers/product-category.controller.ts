import { Request, Response } from 'express';
import ProductCategory from '../models/ProductCategory';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return ProductCategory.qb()
        .orderBy('title')
        .get()
        .then((categories) => {
            return res.status(200).json({ status: 'success', data: categories });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    const { title, slug, parent_id } = req.body;

    return ProductCategory.create(title, slug, parent_id)
        .then((category) => res.status(201).json({ status: 'success', data: category }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { title, slug, parent_id } = req.body;

    const categoryToUpdate = ProductCategory.qb().where('id', Number(id)).first() as Promise<ProductCategory>;

    return categoryToUpdate
        .then((category) => {
            category.title = title;
            category.slug = slug;
            category.parent_id = parent_id;

            return category
                .store()
                .then((updCategory) => res.status(200).json({ status: 'success', data: updCategory }))
                .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    return ProductCategory.qb()
        .where('id', Number(id))
        .delete()
        .then(() => {
            return res.status(200).json({ status: 'success', data: null });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const listProducts = async (req: Request, res: Response): Promise<Response> => {
    return res.send('(List products belonging to a category)');
};
