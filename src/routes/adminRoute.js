import express from 'express';
import { adminCtrlr } from '../controllers/index.js';

const router = express.Router();
router.post('/loginPage', adminCtrlr.loginPage); // Create a new user
export default router;
