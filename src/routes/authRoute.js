import express from 'express';
import { authCtrlr } from '../controllers/index.js';

const router = express.Router();

router.post('/loginPage', authCtrlr.loginPage); // Create a new user

export default router;
