import express from 'express';
import { pageCtrlr } from '../controllers/index.js';

const router = express.Router();

router.post('/bookings', pageCtrlr.createBooking);
router.post('/contant-us-page', pageCtrlr.contantUsPage);
router.post('/Create-newsletter', pageCtrlr.CreateNewsletter);

export default router;
