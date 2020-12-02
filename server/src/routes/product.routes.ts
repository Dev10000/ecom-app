import { Router } from 'express';
import authenticated from '../middleware/authenticated';
import productValidator, { productQuery } from '../validators/product';
import { getAll, getSingle, search, create, edit, destroy } from '../controllers/product.controller';

const router = Router();

router.get('/', productQuery, getAll);
router.get('/:id', getSingle);
router.get('/search/:keywords', productQuery, search);
router.post('/', authenticated, productValidator, create);
router.patch('/:id', authenticated, productValidator, edit);
router.delete('/:id', authenticated, destroy);

export default router;
