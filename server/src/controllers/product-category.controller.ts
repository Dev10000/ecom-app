import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import ProductCategory from '../models/ProductCategory';
import { checkIfStringExistsInTable, insertTitleAndSlug, postfixNumberGenerator, slugify } from '../database/utils';
import Product from '../models/Product';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return QueryBuilder(ProductCategory)
        .whereNull('parent_id')
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
    // console.log(req.body);
    // const { title, parent_id } = req.body;
    // console.log(title + parent_id);
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

    return QueryBuilder<IProductCategoryModel>(ProductCategory)
        .with('products')
        .where('id', id)
        .first()
        .then(async (category) => {
            if (!category) {
                return res.status(404).json({ status: 'error', data: 'Product Category not found!' });
            }

            // if there are no products in this category
            if (!category.products) {
                // we query the subcategories
                let subcategoryProducts: IProductModel[] = [];

                const subcategories = await QueryBuilder<IProductCategoryModel>(ProductCategory)
                    .where('parent_id', id)
                    .get();

                const results = [];
                const queryResults: IProductModel[][] = [];
                // eslint-disable-next-line no-restricted-syntax
                for (const subcategory of subcategories) {
                    results.push(
                        QueryBuilder<IProductModel>(Product)
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            .where('product_category_id', subcategory.id!)
                            .get(),
                    );
                    // console.log('loop');
                }
                queryResults.push(...(await Promise.all(results)));

                subcategoryProducts = queryResults.flat(1);
                return res.status(200).json({ status: 'success', data: subcategoryProducts });
            }

            return res.status(200).json({ status: 'success', data: category.products });
        });
};

export const createAndSlugify = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    const { title, parent_id } = req.body;
    const slug = await slugify(title);

    return checkIfStringExistsInTable(title, parent_id, 'title', 'product_categories')
        .then((ifExists) => {
            if (!ifExists) {
                return insertTitleAndSlug(parent_id, title, slug);
            }
            return postfixNumberGenerator(title, parent_id, slug).then((script) =>
                insertTitleAndSlug(parent_id, script[0], script[1]),
            );
        })
        .then((category) => res.status(201).json({ status: 'success', data: category }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getAllSubCategories = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return ProductCategory.getAllSubCategories(id).then((category) => {
        if (!category) {
            return res.status(404).json({ status: 'error', data: 'Product Category not found!' });
        }

        return res.status(200).json({ status: 'success', data: category });
    });
};

export const getCategoryTree = async (req: Request, res: Response): Promise<Response> => {
    return ProductCategory.getCategoryTree().then((category) => {
        if (!category) {
            return res.status(404).json({ status: 'error', data: 'Product Category not found!' });
        }

        return res.status(200).json({ status: 'success', data: category });
    });
};
