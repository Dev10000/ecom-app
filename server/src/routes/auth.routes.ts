import { Router } from 'express';
import login from '../controllers/auth/login.controller';
import register from '../controllers/auth/register.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
// TODO: Forgot password
// TODO: Change password
// TODO: Logout
// TODO: Refresh token !?

export default router;
