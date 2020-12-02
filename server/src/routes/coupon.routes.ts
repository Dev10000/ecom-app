import { Router } from 'express';
import authenticated from '../middleware/authenticated';

import { getAll, getSingle, create, edit, destroy } from '../controllers/coupon.controller';
import couponValidator from '../validators/coupon';

const router = Router();

router.get('/', authenticated, getAll);
router.get('/:id', authenticated, getSingle);
router.post('/', authenticated, couponValidator, create);
router.patch('/:id', authenticated, couponValidator, edit);
router.delete('/:id', authenticated, destroy);

export default router;
