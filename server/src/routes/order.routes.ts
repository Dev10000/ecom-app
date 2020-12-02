import { Router } from 'express';
import authenticated from '../middleware/authenticated';
import orderValidator, { orderQuery } from '../validators/order';
import { getAll, getSingle, create } from '../controllers/order.controller';

const router = Router();

router.get('/', authenticated, orderQuery, getAll);
router.get('/:id', authenticated, getSingle);
router.post('/', authenticated, orderValidator, create);

export default router;
