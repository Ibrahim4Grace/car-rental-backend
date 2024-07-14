import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import db from './src/config/db.js';
import { notFound, errorHandler } from './src/middlewares/errorMiddleware.js';
import routes from './src/routes/index.js';
import cors from 'cors';
import corsOptions from './src/config/corsOptions.js';
import colors from 'colors';

dotenv.config();

db.connectDb();

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Kadosh API is running');
});

// Use routes
app.use(routes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`.yellow);
});
