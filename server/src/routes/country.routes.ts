import { Router } from 'express';
import passport from 'passport';
import countryValidator from '../validators/country';
import { getAll, getFullData, create, edit, destroy } from '../controllers/country.controller';

const router = Router();

router.get('/', getAll);
router.get('/full', passport.authenticate('jwt', { session: false }), getFullData);
router.post('/', passport.authenticate('jwt', { session: false }), countryValidator, create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), countryValidator, edit);
router.delete('/:id', passport.authenticate('jwt', { session: false }), destroy);

export default router;
