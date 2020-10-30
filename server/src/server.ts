import express from 'express';
import cors from 'cors';
import passport from 'passport';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import passportMiddleware from './middleware/passport';

// initializations
const app = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// routes
app.get('/', (_req, res) => res.send('Server Homepage here!'));
app.use(routes());

// error handler needs to be the last middleware
app.use(errorHandler);

export default app;
