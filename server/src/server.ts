import express from 'express';
import cors from 'cors';
// import passport from 'passport';
import routes from './routes';

// initializations
const app = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(passport.initialize());
// passport.use(**add the middleware here**);

// routes
app.get('/', (_req, res) => res.send('Server Homepage here!'));
app.use('/api', routes);

export default app;
