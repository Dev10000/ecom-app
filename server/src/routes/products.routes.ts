import { Router } from 'express';
import passport from 'passport';

import { getAll, getSingle, create, edit, destroy } from '../controllers/product.controller';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), getSingle);
router.post('/', passport.authenticate('jwt', { session: false }), create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), edit);
router.delete('/:id', passport.authenticate('jwt', { session: false }), destroy);

export default router;
