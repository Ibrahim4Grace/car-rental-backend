import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import { db, corsOptions, customEnv } from './src/config/index.js';
import { notFound, errorHandler } from './src/middlewares/errorMiddleware.js';
// import keepAlive from './src/config/cronJob.js';
import routes from './src/routes/index.js';
import cors from 'cors';

import colors from 'colors';

dotenv.config();

db.connectDb();

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Korex-auto-rentals API is running');
});

// Use routes
app.use(routes);

// Custom 404 error middleware
app.use(notFound);
// General error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`.yellow);
});

// // Start cron job keepAlive function
// keepAlive();
