import { Router } from 'express';
import passport from 'passport';
import orderValidator, { orderQuery } from '../validators/order';
import { getAll, getSingle, create } from '../controllers/order.controller';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), orderQuery, getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), getSingle);
router.post('/', passport.authenticate('jwt', { session: false }), orderValidator, create);

export default router;
