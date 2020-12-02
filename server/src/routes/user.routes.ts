import { Router } from 'express';
import passport from 'passport';
import registerValidator from '../validators/register';
import { userQuery } from '../validators/user';
import { getAllUsers, getUser, editUser, getUserOrders, getUserArticles } from '../controllers/user.controller';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), userQuery, getAllUsers);
router.get('/:id', passport.authenticate('jwt', { session: false }), getUser);

// use the same validator with endpoints for user create and edit
router.patch('/:id', passport.authenticate('jwt', { session: false }), registerValidator, editUser);
router.get('/:id/orders', passport.authenticate('jwt', { session: false }), getUserOrders);
router.get('/:id/articles', passport.authenticate('jwt', { session: false }), getUserArticles);

export default router;
