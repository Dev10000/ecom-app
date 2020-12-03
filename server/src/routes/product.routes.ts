import { Router } from 'express';
import Verify from '../middleware/verify';
import productValidator, { productQuery } from '../validators/product';
import { getAll, getSingle, search, create, edit, destroy } from '../controllers/product.controller';

const router = Router();

router.get('/', productQuery, getAll);
router.get('/:id', getSingle);
router.get('/search/:keywords', productQuery, search);
router.post('/', Verify.isAdmin, productValidator, create);
router.patch('/:id', Verify.isAdmin, productValidator, edit);
router.delete('/:id', Verify.isAdmin, destroy);

export default router;
