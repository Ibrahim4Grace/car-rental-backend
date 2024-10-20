import express from 'express';
import * as pageCtrlr from '../controllers/index.js';
import { validateData } from '../middlewares/index.js';
import {
  bookingSchema,
  contactUsSchema,
} from '../schema/index.js';

const pageRoute = express.Router();

pageRoute.post(
  '/bookings',
  validateData(bookingSchema),
  pageCtrlr.createBooking
);
pageRoute.post(
  '/contact-us',
  validateData(contactUsSchema),
  pageCtrlr.contantUsPage
);

export default pageRoute;
