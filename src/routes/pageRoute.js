import express from 'express';
import * as pageCtrlr from '../controllers/index.js';

const router = express.Router();

router.post('/bookings', pageCtrlr.createBooking);
router.post('/contact-us-page', pageCtrlr.contantUsPage);

export default router;
