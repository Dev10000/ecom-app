import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import config from '../config';
import UserModel from '../models/User';

const User = new UserModel();

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
};

// http://www.passportjs.org/packages/passport-jwt/
export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.where('id', payload.id).first();

        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
});
