import { Router } from 'express';
import Verify from '../middleware/verify';
import { exportCountries, exportCategories } from '../controllers/admin.controller';

const router = Router();

router.get('/export-countries', Verify.isAdmin, exportCountries);
router.get('/export-categories', Verify.isAdmin, exportCategories);

export default router;
