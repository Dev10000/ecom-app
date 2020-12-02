import { Router } from 'express';
// import passport from 'passport';
import { getSingle } from '../controllers/product-spec.controller';
// import { getAll, getSingle, create, edit, destroy } from '../controllers/product-spec.controller';
// import specsValidator from '../validators/specs';

const router = Router();

// router.get('/', passport.authenticate('jwt', { session: false }), getAll);
router.get('/:id', getSingle);
// router.post('/', [passport.authenticate('jwt', { session: false }), couponValidator], create);
// router.patch('/:id', [passport.authenticate('jwt', { session: false }), couponValidator], edit);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), destroy);

export default router;
