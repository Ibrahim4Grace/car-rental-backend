import express from 'express';
import { pageCtrlr } from '../controllers/index.js';

const router = express.Router();

router.post('/bookings', pageCtrlr.createBooking);
router.post('/contantUsPage', pageCtrlr.contantUsPage);
router.post('/CreateNewsletter', pageCtrlr.CreateNewsletter);

export default router;
