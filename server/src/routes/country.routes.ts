import { Router } from 'express';
import passport from 'passport';
import countryValidator from '../validators/country';
import { getAll, getSingle, create, edit, destroy } from '../controllers/country.controller';

const router = Router();

router.get('/', getAll);
router.get('/:id', passport.authenticate('jwt', { session: false }), getSingle);
router.post('/', passport.authenticate('jwt', { session: false }), countryValidator, create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), countryValidator, edit);
router.delete('/:id', passport.authenticate('jwt', { session: false }), destroy);

export default router;
