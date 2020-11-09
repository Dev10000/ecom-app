import { Router } from 'express';
import passport from 'passport';

import { getAll, create, edit, destroy } from '../controllers/country.controller';

const router = Router();

router.get('/', getAll);
router.post('/', passport.authenticate('jwt', { session: false }), create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), edit);
router.delete('/:id', passport.authenticate('jwt', { session: false }), destroy);

export default router;