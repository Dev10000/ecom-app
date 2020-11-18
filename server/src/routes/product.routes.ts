import { Router } from 'express';
import passport from 'passport';
import productValidator from '../validators/product';
import { getAll, getSingle, create, edit, destroy } from '../controllers/product.controller';

const router = Router();

router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', passport.authenticate('jwt', { session: false }), productValidator, create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), productValidator, edit);
router.delete('/:id', passport.authenticate('jwt', { session: false }), destroy);

export default router;
