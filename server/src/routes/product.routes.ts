import { Router } from 'express';
import Verify from '../middleware/verify';
import productValidator, { productQuery } from '../validators/product';
import {
    getAll,
    getCount,
    getSingle,
    getReviews,
    search,
    create,
    edit,
    destroy,
    filterProduct,
    getRelated,
    searchCount,
    // getAllInSubCategories,
} from '../controllers/product.controller';

const router = Router();

router.get('/', productQuery, getAll);
router.get('/count', getCount);
// router.get('/subcat/:id', getAllInSubCategories);
router.get('/:id/related', getRelated);
router.get('/:id/reviews', getReviews);
router.get('/:id', getSingle);
router.get('/search/:keywords/count', searchCount);
router.get('/search/:keywords', productQuery, search);
router.post('/filter/', filterProduct);
router.post('/', Verify.isAdmin, productValidator, create);
router.patch('/:id', Verify.isAdmin, productValidator, edit);
router.delete('/:id', Verify.isAdmin, destroy);

export default router;
