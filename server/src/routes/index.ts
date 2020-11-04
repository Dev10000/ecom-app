import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import orderRoutes from './order.routes';
import productRoutes from './products.routes';
import productCategoriesRoutes from './product-category.routes';
import couponRoutes from './coupons.routes';
import countryRoutes from './countries.routes';

const routes = (): Router => {
    const router = Router();

    router.use('/api', authRoutes);
    router.use('/api/users', userRoutes);
    router.use('/api/orders', orderRoutes);
    router.use('/api/products', productRoutes);
    router.use('/api/categories', productCategoriesRoutes);
    router.use('/api/coupons', couponRoutes);
    router.use('/api/countries', countryRoutes);

    return router;
};

export default routes;
