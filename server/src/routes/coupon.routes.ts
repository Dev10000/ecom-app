import { Router } from 'express';
import passport from 'passport';

import { getAll, getSingle, create, edit, destroy } from '../controllers/coupon.controller';
import couponValidator from '../validators/coupon';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), getSingle);
router.post('/', [passport.authenticate('jwt', { session: false }), couponValidator], create);
router.patch('/:id', [passport.authenticate('jwt', { session: false }), couponValidator], edit);
router.delete('/:id', passport.authenticate('jwt', { session: false }), destroy);

export default router;
