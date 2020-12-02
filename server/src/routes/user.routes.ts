import { Router } from 'express';
import authenticated from '../middleware/authenticated';
import registerValidator from '../validators/register';
import { userQuery } from '../validators/user';
import { getAllUsers, getUser, editUser, getUserOrders, getUserArticles } from '../controllers/user.controller';

const router = Router();

router.get('/', authenticated, userQuery, getAllUsers);
router.get('/:id', authenticated, getUser);
router.patch('/:id', authenticated, registerValidator, editUser);
router.get('/:id/orders', authenticated, getUserOrders);
router.get('/:id/articles', authenticated, getUserArticles);

export default router;
