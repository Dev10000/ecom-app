import { Router } from 'express';
import passport from 'passport';
import orderValidator from '../validators/order';
import { getAll, getSingle, create } from '../controllers/order.controller';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), getSingle);
router.post('/', passport.authenticate('jwt', { session: false }), orderValidator, create);

export default router;
