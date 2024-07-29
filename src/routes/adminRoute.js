import express from 'express';
import * as adminCtrlr from '../controllers/index.js';
const router = express.Router();
router.post('/loginPage', adminCtrlr.loginPage); // Create a new user
router.post('/loginPage', adminCtrlr.loginPs); // Create a new user

export default router;
