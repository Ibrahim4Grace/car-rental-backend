import express from 'express';
import * as authCtrlr from '../controllers/index.js';
const router = express.Router();

router.post('/loginPage', authCtrlr.loginPage); // Create a new user
router.post('/loginPage', authCtrlr.loginPages); // Create a new user
export default router;
