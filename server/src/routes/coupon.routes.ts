import { Router } from 'express';
import Verify from '../middleware/verify';

import { getAll, getSingle, create, edit, destroy } from '../controllers/coupon.controller';
import couponValidator from '../validators/coupon';

const router = Router();

router.get('/', Verify.isUser, getAll);
router.get('/:id', Verify.isUser, getSingle);
router.post('/', Verify.isUser, couponValidator, create);
router.patch('/:id', Verify.isUser, couponValidator, edit);
router.delete('/:id', Verify.isUser, destroy);

export default router;
