import { Router } from 'express';
import Verify from '../middleware/verify';
import countryValidator from '../validators/country';
import { getAll, getSingle, create, edit, destroy } from '../controllers/country.controller';

const router = Router();

router.get('/', getAll);
router.get('/:id', Verify.isUser, getSingle);
router.post('/', Verify.isUser, countryValidator, create);
router.patch('/:id', Verify.isUser, countryValidator, edit);
router.delete('/:id', Verify.isUser, destroy);

export default router;
