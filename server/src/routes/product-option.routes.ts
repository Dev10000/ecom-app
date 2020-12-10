import { Router } from 'express';
// import passport from 'passport';
import { getSingle, getAll, getAllByCategoryId } from '../controllers/product-option.controller';
// import { getAll, getSingle, create, edit, destroy } from '../controllers/product-spec.controller';
// import specsValidator from '../validators/specs';

const router = Router();

router.get('/', getAll);
router.get('/:id', getSingle);
router.get('/categoryid/:category_id', getAllByCategoryId);
// router.post('/', [passport.authenticate('jwt', { session: false }), couponValidator], create);
// router.patch('/:id', [passport.authenticate('jwt', { session: false }), couponValidator], edit);
// router.delete('/:id', passport.authenticate('jwt', { session: false }), destroy);

export default router;
