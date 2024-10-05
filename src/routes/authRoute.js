import express from 'express';
import * as authCtrlr from '../controllers/index.js';
import { validateData } from '../middlewares/index.js';
import { registerSchema } from '../schema/index.js';

const authRoute = express.Router();

authRoute.post(
  '/register',
  validateData(registerSchema),
  authCtrlr.registerPage
);
authRoute.post('/verify-otp', authCtrlr.verifyOtp);
authRoute.post('/forget-password', authCtrlr.forgetPassword);
authRoute.post('/reset-password', authCtrlr.resetPassword);

export default authRoute;
