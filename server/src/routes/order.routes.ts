import { Router } from 'express';
import Verify from '../middleware/verify';
import orderValidator, { orderQuery } from '../validators/order';
import { getAll, getSingle, create } from '../controllers/order.controller';

const router = Router();

router.get('/', Verify.isUser, orderQuery, getAll);
router.get('/:id', Verify.isUser, getSingle);
router.post('/', Verify.isUser, orderValidator, create);

export default router;
