import { body } from 'express-validator';
import QueryBuilder from '../database/QueryBuilder';
import Article from '../models/Article';

const checkIfExists = async (column: string, value: string, id?: number): Promise<boolean | ErrorEvent> => {
    return QueryBuilder(Article)
        .where(column, value)
        .where('id', '<>', id || -1)
        .get()
        .then((article) => {
            if (article && article.length)
                return Promise.reject(new Error(`A record with this ${column} already exists.`));
            return true;
        });
};

export default [
    body('title').trim().notEmpty().withMessage('Title is a required field.'),
    body('slug')
        .trim()
        .optional()
        .custom(async (value, { req }) => {
            return req.params && req.params.id
                ? checkIfExists('slug', value, req.params.id)
                : checkIfExists('slug', value);
        }),
    body('featured_image').trim().notEmpty().withMessage('Featured image is a required field.'),
    body('body').notEmpty().withMessage('Article body is a required field.'),
];
