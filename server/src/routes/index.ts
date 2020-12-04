import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import orderRoutes from './order.routes';
import productRoutes from './product.routes';
import productCategoriesRoutes from './product-category.routes';
import couponRoutes from './coupon.routes';
import countryRoutes from './country.routes';
import specRoutes from './product-spec.routes';
import articleRoutes from './article.routes';

const routes = (): Router => {
    const router = Router();

    router.use('/api', authRoutes);
    router.use('/api/users', userRoutes);
    router.use('/api/orders', orderRoutes);
    router.use('/api/products', productRoutes);
    router.use('/api/categories', productCategoriesRoutes);
    router.use('/api/coupons', couponRoutes);
    router.use('/api/countries', countryRoutes);
    router.use('/api/specs', specRoutes);
    router.use('/api/articles', articleRoutes);

    return router;
};

export default routes;
