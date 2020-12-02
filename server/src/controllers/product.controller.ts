import { extname } from 'path';
import { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import Product from '../models/Product';

// the uploaded files can be accessed with browser at http://localhost:5000/product_images/test.txt
function moveUploadedFile(file: fileUpload.UploadedFile) {
    const storePath = 'storage/product_images/';
    const newFileName = uuidv4() + extname(file.name); // save the file uuid with original extension
    file.mv(storePath + newFileName);
    console.log(`Uploaded ${file.name} to ${storePath + newFileName}`);
    // TODO: save the filenames to the DB
}

// export const getAll = async (req: Request, res: Response): Promise<Response> => {
//     return QueryBuilder(Product)
//         .get()
//         .then((products) => {
//             return res.status(200).json({ status: 'success', data: products });
//         })
//         .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
// };

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    const { page, items } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    console.log({ page }, { items });

    return QueryBuilder(Product)
        .paginate(Number(page) || 1, Number(items) || 25)
        .get()
        .then((products) => {
            return res.status(200).json({ status: 'success', data: products });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    // console.log(req.params);
    return Product.findProduct<IProductModel>(id)
        .then((product) => {
            if (product && product.id) {
                return res.status(200).json({ status: 'success', data: product });
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
        .split(' ')
        .filter((i) => i)
        .join('|');
    return QueryBuilder(Product)
        .where('title', '~*', `(${regex})`) // Matches regular expression, case insensitive
        .paginate(Number(page) || 1, Number(items) || 25)
        .get()
        .then((products) => {
            return res.status(200).json({ status: 'success', data: products });
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

            if (req.files?.images) {
                const { images } = req.files;
                // multi or a single file upload
                if (Array.isArray(images)) images.forEach(moveUploadedFile);
                else moveUploadedFile(images);
            }

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
