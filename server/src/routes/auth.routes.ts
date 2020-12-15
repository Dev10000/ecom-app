import { Router } from 'express';
import login from '../controllers/auth/login.controller';
import logout from '../controllers/auth/logout.controller';
import register from '../controllers/auth/register.controller';
import registerValidator from '../validators/register';
import loginValidator from '../validators/login';
import Verify from '../middleware/verify';

const router = Router();

router.post('/register', Verify.isGuest, registerValidator, register);
router.post('/login', Verify.isGuest, loginValidator, login);
router.post('/logout', Verify.isUser, logout);
// TODO: Forgot password
// TODO: Change password
// TODO: Refresh token !?

export default router;
