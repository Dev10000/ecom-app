import { Router } from 'express';
import authenticated from '../middleware/authenticated';
import countryValidator from '../validators/country';
import { getAll, getSingle, create, edit, destroy } from '../controllers/country.controller';

const router = Router();

router.get('/', getAll);
router.get('/:id', authenticated, getSingle);
router.post('/', authenticated, countryValidator, create);
router.patch('/:id', authenticated, countryValidator, edit);
router.delete('/:id', authenticated, destroy);

export default router;
