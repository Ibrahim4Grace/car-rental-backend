import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import { db, corsOptions } from './src/config/index.js';
import { log } from './src/utils/index.js';
import { notFound, errorHandler } from './src/middlewares/errorMiddleware.js';
// import keepAlive from './src/config/cronJob.js';
import routes from './src/routes/index.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import statusMonitor from 'express-status-monitor';

import colors from 'colors';

db.connectDb();

const app = express();

// Set up express-status-monitor
app.use(statusMonitor());

app.use(cors(corsOptions));

// Request Payload Size Limiting 15mb
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));
app.use(cookieParser());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later',
});
app.use('/api', apiLimiter);

app.get('/', (req, res) => {
  res.send('Korex-auto-rentals API is running');
});

app.use(routes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 6000;

app.listen(port, () => {
  log.info(`Server running on port ${port}`.yellow);
});

// // Start cron job keepAlive function
// keepAlive();
