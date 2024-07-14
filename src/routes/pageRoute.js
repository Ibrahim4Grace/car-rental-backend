import express from 'express';
import { pageCtrlr } from '../controllers/index.js';

const router = express.Router();

router.post('/contantUsPage', pageCtrlr.contantUsPage);

export default router;
