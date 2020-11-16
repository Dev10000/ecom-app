import { Router } from 'express';
import passport from 'passport';

import { getAll, createAndSlugify, edit, destroy, listProducts } from '../controllers/product-category.controller';
import categoryValidator from '../validators/category';

const router = Router();

router.get('/', getAll);
router.post('/', passport.authenticate('jwt', { session: false }), categoryValidator, createAndSlugify);
router.patch('/:id', passport.authenticate('jwt', { session: false }), categoryValidator, edit);
router.delete('/:id', passport.authenticate('jwt', { session: false }), destroy);
router.get('/:id/products', passport.authenticate('jwt', { session: false }), listProducts);

export default router;
