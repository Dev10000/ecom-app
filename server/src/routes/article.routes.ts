import { Router } from 'express';
import authenticated from '../middleware/authenticated';
import { getAll, getPublished, getSingle, create, edit, destroy } from '../controllers/article.controller';

const router = Router();

router.get('/', getPublished);
router.get('/all', authenticated, getAll);
router.get('/:id', authenticated, getSingle);
router.post('/', authenticated, create);
router.patch('/:id', authenticated, edit);
router.delete('/:id', authenticated, destroy);

export default router;
