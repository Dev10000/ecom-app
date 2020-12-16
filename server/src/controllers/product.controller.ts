import { extname } from 'path';
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import Product from '../models/Product';
import ProductImage from '../models/ProductImage';

// multi or a single file upload
function handleFiles(images: UploadedFile, id: string) {
    // the uploaded files can be accessed with browser at http://localhost:5000/product_images/test.txt
    function moveUploadedFile(file: UploadedFile) {
        const storePath = 'storage/product_images/';
        const uuid = uuidv4();
        const newFileName = uuid + extname(file.name); // save the file uuid with original extension
        file.mv(storePath + newFileName);
        console.log(`Uploaded ${file.name} to ${storePath + newFileName}`);
        // WIP: save the filenames to the DB
        const data = { uuid, filename: file.name, product_id: Number(id) };
        return ProductImage.create<IProductImageModel>(data as Partial<IProductImage>).save();
    }
    if (Array.isArray(images)) images.forEach(moveUploadedFile);
    else moveUploadedFile(images);
}

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    const { page, items } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    return QueryBuilder(Product)
        .with('images')
        .paginate(Number(page) || 1, Number(items) || 24)
        .get()
        .then((products) => {
            return res.status(200).json({ status: 'success', data: products });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getCount = async (req: Request, res: Response): Promise<Response> => {
    return QueryBuilder(Product)
        .count()
        .then((productCount) => {
            return res.status(200).json({ status: 'success', data: productCount });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return QueryBuilder<IProductModel>(Product)
        .with('images', 'specs')
        .where('id', id)
        .first()
        .then((product) => {
            if (product && product.id) {
                return res.status(200).json({ status: 'success', data: product });
            }
            return res.status(404).json({ status: 'error', data: 'Resource not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getRelated = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Product.find<IProductModel>(id)
        .then((product) => {
            if (product && product.product_category_id) {
                return QueryBuilder(Product)
                    .with('images')
                    .where('product_category_id', product.product_category_id)
                    .get()
                    .then((relatedProducts) => {
                        return res.status(200).json({ status: 'success', data: relatedProducts });
                    });
            }
            return res.status(404).json({ status: 'error', data: 'Resource not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getReviews = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return QueryBuilder<IProductModel>(Product)
        .where('id', id)
        .with('reviews')
        .first()
        .then((product) => {
            if (product) {
                return res.status(200).json({ status: 'success', data: product.reviews });
            }
            return res.status(404).json({ status: 'error', data: 'Resource not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const search = async (req: Request, res: Response): Promise<Response> => {
    const { keywords } = req.params;
    const { page, items } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    // split search keywords, remove spaces and join them with |
    const regex = keywords
        .split(/\s+/)
        .filter((i) => i)
        .join('|');
    return QueryBuilder(Product)
        .with('images')
        .where('title', '~*', `(${regex})`) // Matches regular expression, case insensitive
        .orWhere('description', '~*', `(${regex})`)
        .paginate(Number(page) || 1, Number(items) || 24)
        .get()
        .then((searchResults) => {
            return res.status(200).json({ status: 'success', data: searchResults });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const searchCount = async (req: Request, res: Response): Promise<Response> => {
    const { keywords } = req.params;

    const regex = keywords
        .split(/\s+/)
        .filter((i) => i)
        .join('|');

    return QueryBuilder(Product)
        .where('title', '~*', `(${regex})`) // Matches regular expression, case insensitive
        .orWhere('description', '~*', `(${regex})`)
        .count()
        .then((searchResCount) => {
            return res.status(200).json({ status: 'success', data: searchResCount });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    return Product.create<IProductModel>(req.body as Partial<IProduct>)
        .save()
        .then((product) => res.status(201).json({ status: 'success', data: product }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

// when including the images-field for uploading product images, the content-type sent must be multipart/form-data
export const edit = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Product.find<IProductModel>(id)
        .then((product) => {
            if (!product) {
                return res.status(404).json({ status: 'error', data: 'Product not found!' });
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

            Object.assign(product, req.body as IProduct);

            if (req.files) handleFiles(req.files.images, id);

            return product
                .save() // this should handle the database change
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

export const filterProduct = async (req: Request, res: Response): Promise<Response> => {
    return Product.filter(req.body)
        .then((products) => {
            if (products) {
                return res.status(200).json({ status: 'success', data: products });
            }
            return res.status(404).json({ status: 'error', data: 'Resource not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

// export const getAllInSubCategories = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;
//     return Product.getAllInSubCategories(id)
//         .then((products) => {
//             if (products) {
//                 return res.status(200).json({ status: 'success', data: products });
//             }
//             return res.status(404).json({ status: 'error', data: 'Resource not found!' });
//         })
//         .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
// };
