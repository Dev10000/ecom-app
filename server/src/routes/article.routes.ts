import { Router } from 'express';
import Verify from '../middleware/verify';
import { getAll, getPublished, getSingle, create, edit, destroy } from '../controllers/article.controller';

const router = Router();

router.get('/', getPublished);
router.get('/all', Verify.isAdmin, getAll);
router.get('/:id', Verify.isUser, getSingle);
router.post('/', Verify.isAdmin, create);
router.patch('/:id', Verify.isAdmin, edit);
router.delete('/:id', Verify.isAdmin, destroy);

export default router;
