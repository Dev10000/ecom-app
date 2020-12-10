import { Router } from 'express';
import Verify from '../middleware/verify';

import { getAll, getSingle, create, edit, destroy } from '../controllers/review.controller';
import reviewValidator from '../validators/review';

const router = Router();

router.get('/', Verify.isAdmin, getAll);
router.get('/:id', getSingle);
router.post('/', Verify.isUser, reviewValidator, create);
router.patch('/:id', Verify.isUser, reviewValidator, edit);
router.delete('/:id', Verify.isUser, destroy);

export default router;
