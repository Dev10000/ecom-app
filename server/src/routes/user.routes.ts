import { Router } from 'express';
import passport from 'passport';
import registerValidator from '../validators/register';
import { userQuery } from '../validators/user';
import { getAllUsers, editUser, getUserOrders, getUser } from '../controllers/user.controller';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), userQuery, getAllUsers);
router.get('/:id', passport.authenticate('jwt', { session: false }), getUser);

// use the same validator with endpoints for user create and edit
router.patch('/:id', passport.authenticate('jwt', { session: false }), registerValidator, editUser);

router.get('/:id/orders', passport.authenticate('jwt', { session: false }), getUserOrders);

export default router;
