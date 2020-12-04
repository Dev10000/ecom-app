import { Router } from 'express';
import Verify from '../middleware/verify';

import { getAll, getSingle, create, edit, destroy } from '../controllers/coupon.controller';
import couponValidator from '../validators/coupon';

const router = Router();

router.get('/', Verify.isAdmin, getAll);
router.get('/:id', Verify.isUser, getSingle);
router.post('/', Verify.isAdmin, couponValidator, create);
router.patch('/:id', Verify.isAdmin, couponValidator, edit);
router.delete('/:id', Verify.isAdmin, destroy);

export default router;
