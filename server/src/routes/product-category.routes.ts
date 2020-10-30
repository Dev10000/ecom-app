import { Router } from 'express';
import passport from 'passport';

import { getAll, create, edit, destroy, listProducts } from '../controllers/product-category.controller';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAll);
router.post('/', passport.authenticate('jwt', { session: false }), create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), edit);
router.delete('/:id', passport.authenticate('jwt', { session: false }), destroy);
router.get('/:id/products', passport.authenticate('jwt', { session: false }), listProducts);

export default router;
