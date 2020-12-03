import { Router } from 'express';
import Verify from '../middleware/verify';
import articleValidator from '../validators/article';
import { getAll, getPublished, getSingle, create, edit, destroy } from '../controllers/article.controller';

const router = Router();

router.get('/', getPublished);
router.get('/all', Verify.isAdmin, getAll);
router.get('/:id', Verify.isUser, getSingle);
router.post('/', Verify.isAdmin, articleValidator, create);
router.patch('/:id', Verify.isAdmin, articleValidator, edit);
router.delete('/:id', Verify.isAdmin, destroy);

export default router;
