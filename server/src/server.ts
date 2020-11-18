import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import passport from 'passport';
import routes from './routes';
import requestLogger from './middleware/requestLogger';
import errorHandler from './middleware/errorHandler';
import passportMiddleware from './middleware/passport';

// initializations
const app = express();

// middlewares
app.use(requestLogger);
app.use(express.static('storage')); // access static files in storage folder
app.use(cors());
app.use(fileUpload()); // parses multipart/form-data
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
