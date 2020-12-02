import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import Article from '../models/Article';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    return QueryBuilder(Article)
        .get()
        .then((article) => {
            return res.status(200).json({ status: 'success', data: article });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getPublished = async (req: Request, res: Response): Promise<Response> => {
    return QueryBuilder(Article)
        .whereNotNull('published_at')
        .get()
        .then((article) => {
            return res.status(200).json({ status: 'success', data: article });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const getSingle = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Article.find<IArticleModel>(id)
        .then((article) => {
            if (article) {
                return res.status(200).json({ status: 'success', data: article });
            }
            return res.status(404).json({ status: 'error', data: 'Article not found!' });
        })
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const create = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

    return Article.create<IArticleModel>(req.body as Partial<IArticle>)
        .save()
        .then((article) => res.status(201).json({ status: 'success', data: article }))
        .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
};

export const edit = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Article.find<IArticleModel>(id)
        .then((article) => {
            if (!article) {
                return res.status(404).json({ status: 'error', data: 'Article not found!' });
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(422).json({ status: 'error', data: errors.array() });

            Object.assign(article, req.body as Partial<IArticle>);

            return article
                .save()
                .then((updatedArticle) => res.status(200).json({ status: 'success', data: updatedArticle }))
                .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
        })
        .catch((e) => Promise.reject(e.message));
};

export const destroy = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Article.find<IArticleModel>(id).then((article) => {
        if (!article) {
            return res.status(404).json({ status: 'error', data: 'Article not found!' });
        }

        return QueryBuilder(Article)
            .where('id', id)
            .delete()
            .then((response) => {
                console.log({ response });
                if (response) {
                    return res.status(200).json({ status: 'success', data: 'Article successfully removed.' });
                }
                return res.status(500).json({ status: 'error', data: 'Error in removing article' });
            })
            .catch((err) => res.status(500).json({ status: 'error', data: err.message }));
    });
};
