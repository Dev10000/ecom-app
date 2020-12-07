import { Router } from 'express';
import Verify from '../middleware/verify';
import userValidator, { userQuery } from '../validators/user';
import { getAllUsers, getUser, editUser, getUserOrders, getUserArticles } from '../controllers/user.controller';

const router = Router();

router.get('/', Verify.isAdmin, userQuery, getAllUsers);
router.get('/:id', Verify.isUser, getUser);
router.patch('/:id', Verify.isUser, userValidator, editUser);
router.get('/:id/orders', Verify.isAdmin, getUserOrders);
router.get('/:id/articles', Verify.isAdmin, getUserArticles);

export default router;
