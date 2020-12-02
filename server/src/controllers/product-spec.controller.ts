import { Request, Response } from 'express';
// import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import ProductSpec from '../models/ProductSpec';

// NOTE! THIS IS A COPY OF COUPON CONTROLLER AND EACH FUNCTION NEEDS REFACTORING

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return QueryBuilder(ProductSpec)
        .get()
        .then((coupons) => {
            return res.status(200).json({ status: 'success', data: coupons });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return ProductSpec.find<IProductSpec>(id)
        .then((coupon) => {
            if (coupon) {
                return res.status(200).json({ status: 'success', data: coupon });
            }
            return res.status(404).json({ status: 'error', data: 'Coupon not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

// export const create = async (req: Request, res: Response): Promise<Response> => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

//     return ProductSpec.create<IProductSpec>(req.body as Partial<IProductSpec>)
//         .save()
//         .then((coupon) => res.status(201).json({ status: 'success', data: coupon }))
//         .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
// };

// export const edit = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;

//     return ProductSpec.find<IProductSpec>(id)
//         .then((coupon) => {
//             if (!coupon) {
//                 return res.status(404).json({ status: 'error', data: 'Coupon not found!' });
//             }

//             const errors = validationResult(req);
//             if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

//             Object.assign(coupon, req.body as IProductSpec);

//             return coupon
//                 .save()
//                 .then((updCoupon) => res.status(200).json({ status: 'success', data: updCoupon }))
//                 .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
//         })
//         .catch((e) => Promise.reject(e.message));
// };

// export const destroy = async (req: Request, res: Response): Promise<Response> => {
//     const { id } = req.params;

//     return ProductSpec.find<IProductSpec>(id).then((coupon) => {
//         if (!coupon) {
//             return res.status(404).json({ status: 'error', data: 'Coupon not found!' });
//         }

//         return QueryBuilder(ProductSpec)
//             .where('id', id)
//             .delete()
//             .then((response) => {
//                 if (response) {
//                     return res.status(200).json({ status: 'success', data: 'Coupon successfully removed.' });
//                 }
//                 return res.status(500).json({ status: 'error', data: 'Error in removing coupon' });
//             })
//             .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
//     });
// };
