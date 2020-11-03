import { Router } from 'express';
import passport from 'passport';

import { getAllUsers, editUser, getUserOrders, getUser } from '../controllers/user.controller';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAllUsers);
router.get('/:id', passport.authenticate('jwt', { session: false }), getUser);
router.patch('/:id', passport.authenticate('jwt', { session: false }), editUser);
router.get('/:id/orders', passport.authenticate('jwt', { session: false }), getUserOrders);

export default router;
