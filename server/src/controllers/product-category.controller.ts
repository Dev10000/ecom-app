import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import ProductCategory from '../models/ProductCategory';
import { slugify } from '../database/utils';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return QueryBuilder(ProductCategory)
        .orderBy('title')
        .get()
        .then((categories) => {
            return res.status(200).json({ status: 'success', data: categories });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });
    console.log(req.body);
    const { title, parent_id } = req.body;
    console.log(title + parent_id);
    return ProductCategory.create(req.body as Partial<ProductCategory>)
        .save()
        .then((category) => res.status(201).json({ status: 'success', data: category }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return ProductCategory.find<IProductCategoryModel>(id)
        .then((category) => {
            if (!category) {
                return res.status(404).json({ status: 'error', data: 'Category not found!' });
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

            Object.assign(category, req.body as IProductCategory);

            return category
                .save()
                .then((updatedCategory) => res.status(200).json({ status: 'success', data: updatedCategory }))
                .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
        })
        .catch((e) => Promise.reject(e.message));
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return ProductCategory.find<IProductCategoryModel>(id).then((category) => {
        if (!category) {
            return res.status(404).json({ status: 'error', data: 'Product Category not found!' });
        }

        return QueryBuilder(ProductCategory)
            .where('id', id)
            .delete()
            .then((response) => {
                if (response) {
                    return res.status(200).json({ status: 'success', data: 'Product category successfully removed.' });
                }
                return res.status(500).json({ status: 'error', data: 'Error in removing category' });
            })
            .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
    });
};

export const listProducts = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return ProductCategory.find<IProductCategoryModel>(id).then((category) => {
        if (!category) {
            return res.status(404).json({ status: 'error', data: 'Product Category not found!' });
        }

        return category
            .products()
            .then((products) => {
                return res.status(200).json({ status: 'success', data: products });
            })
            .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
    });
};

export const createAndSlugify = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    const { title, parent_id } = req.body;
    return slugify(title, parent_id, 'title', 'slug', 'product_categories')
        .then((category) => res.status(201).json({ status: 'success', data: category }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};
