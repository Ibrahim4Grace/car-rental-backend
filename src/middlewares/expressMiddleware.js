import express from 'express';
import session from 'express-session';

import customEnv from '../configs/customEnv.js';

const app = express();

app.use(
  session({
    secret: customEnv.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    cookie: { secure: customEnv.NODE_ENV === 'production' },
  })
);

export default app;
