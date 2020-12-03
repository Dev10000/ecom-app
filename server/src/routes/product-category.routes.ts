import { Router } from 'express';
import Verify from '../middleware/verify';
import categoryValidator from '../validators/category';
import { getAll, createAndSlugify, edit, destroy, listProducts } from '../controllers/product-category.controller';

const router = Router();

router.get('/', getAll);
router.post('/', Verify.isUser, categoryValidator, createAndSlugify);
router.patch('/:id', Verify.isUser, categoryValidator, edit);
router.delete('/:id', Verify.isUser, destroy);
router.get('/:id/products', listProducts);

export default router;
