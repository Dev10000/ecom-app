import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import Review from '../models/Review';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return QueryBuilder(Review)
        .get()
        .then((reviews) => {
            return res.status(200).json({ status: 'success', data: reviews });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Review.find<IReviewModel>(id)
        .then((review) => {
            if (review) {
                return res.status(200).json({ status: 'success', data: review });
            }
            return res.status(404).json({ status: 'error', data: 'Review not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    // console.log(errors.array());
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    const loggedInUser = req.user as IUserModel;

    // TODO: Remember to update the product review and review count here!!!

    return Review.create<IReviewModel>({ ...(req.body as Partial<IReview>), user_id: loggedInUser.id })
        .save()
        .then((review) => res.status(201).json({ status: 'success', data: review }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const loggedInUser = req.user as IUserModel;

    return Review.find<IReviewModel>(id)
        .then((review) => {
            if (!review) {
                return res.status(404).json({ status: 'error', data: 'Review not found!' });
            }

            if (Number(loggedInUser.id) !== Number(review.user_id) && !loggedInUser.is_admin)
                return res.status(403).json({ status: 'error', data: 'Access denied!' });

            const errors = validationResult(req);
            // console.log(errors.array());
            if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

            Object.assign(review, req.body as Partial<IReview>);

            return review
                .save()
                .then((updatedReview) => res.status(200).json({ status: 'success', data: updatedReview }))
                .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
        })
        .catch((e) => Promise.reject(e.message));
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const loggedInUser = req.user as IUserModel;

    return Review.find<IReviewModel>(id).then((review) => {
        if (!review) {
            return res.status(404).json({ status: 'error', data: 'Review not found!' });
        }

        if (Number(loggedInUser.id) !== Number(review.user_id) && !loggedInUser.is_admin)
            return res.status(403).json({ status: 'error', data: 'Access denied!' });

        return QueryBuilder(Review)
            .where('id', id)
            .delete()
            .then((response) => {
                if (response) {
                    return res.status(200).json({ status: 'success', data: 'Review successfully removed.' });
                }
                return res.status(500).json({ status: 'error', data: 'Error in removing review' });
            })
            .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
    });
};
