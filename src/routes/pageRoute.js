import express from 'express';
import * as pageCtrlr from '../controllers/index.js';

const pageRoute = express.Router();

pageRoute.post('/bookings', pageCtrlr.createBooking);
pageRoute.post('/contact-us-page', pageCtrlr.contantUsPage);

export default pageRoute;
