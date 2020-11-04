import { Router } from 'express';
import passport from 'passport';

import { getAll, create, edit, destroy } from '../controllers/countries.controller';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAll);
router.post('/', passport.authenticate('jwt', { session: false }), create);
router.patch('/:id', passport.authenticate('jwt', { session: false }), edit);
router.delete('/:id', passport.authenticate('jwt', { session: false }), destroy);

export default router;
