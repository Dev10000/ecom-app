import { Router } from 'express';
import authRoutes from './auth.routes';

const defaultRouter = (): Router => {
    const router = Router();

    router.use('/api', authRoutes);

    return router;
};

export default defaultRouter;
