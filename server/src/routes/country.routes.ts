import { Router } from 'express';
import Verify from '../middleware/verify';
import countryValidator from '../validators/country';
import { getAll, getSingle, create, edit, destroy } from '../controllers/country.controller';

const router = Router();

router.get('/', Verify.isAdmin, getAll);
router.get('/:id', Verify.isAdmin, getSingle);
router.post('/', Verify.isAdmin, countryValidator, create);
router.patch('/:id', Verify.isAdmin, countryValidator, edit);
router.delete('/:id', Verify.isAdmin, destroy);

export default router;
