import { Router } from 'express';
import Verify from '../middleware/verify';
import categoryValidator from '../validators/category';
import {
    getAll,
    createAndSlugify,
    edit,
    destroy,
    listProducts,
    // getAllSubCategories,
    // getCategoryTree,
} from '../controllers/product-category.controller';

const router = Router();

router.get('/', Verify.isAdmin, getAll);
// router.get('/subcat/:id', getAllSubCategories);
// router.get('/subcat/', getCategoryTree);
router.post('/', Verify.isAdmin, categoryValidator, createAndSlugify);
router.patch('/:id', Verify.isAdmin, categoryValidator, edit);
router.delete('/:id', Verify.isAdmin, destroy);
router.get('/:id/products', listProducts);

export default router;
