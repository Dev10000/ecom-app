import { Router } from 'express';
import authenticated from '../middleware/authenticated';
import categoryValidator from '../validators/category';
import { getAll, createAndSlugify, edit, destroy, listProducts } from '../controllers/product-category.controller';

const router = Router();

router.get('/', getAll);
router.post('/', authenticated, categoryValidator, createAndSlugify);
router.patch('/:id', authenticated, categoryValidator, edit);
router.delete('/:id', authenticated, destroy);
router.get('/:id/products', listProducts);

export default router;
