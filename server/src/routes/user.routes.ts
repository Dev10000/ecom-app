import { Router } from 'express';
import Verify from '../middleware/verify';
import registerValidator from '../validators/register';
import { userQuery } from '../validators/user';
import { getAllUsers, getUser, editUser, getUserOrders, getUserArticles } from '../controllers/user.controller';

const router = Router();

router.get('/', Verify.isUser, userQuery, getAllUsers);
router.get('/:id', Verify.isUser, getUser);
router.patch('/:id', Verify.isUser, registerValidator, editUser);
router.get('/:id/orders', Verify.isUser, getUserOrders);
router.get('/:id/articles', Verify.isUser, getUserArticles);

export default router;
