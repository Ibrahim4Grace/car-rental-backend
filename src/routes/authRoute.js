import express from 'express';
import * as authCtrlr from '../controllers/index.js';
const authRoute = express.Router();

authRoute.post('/register', authCtrlr.registerPage);
authRoute.post('/verify-otp', authCtrlr.verifyOtp);
authRoute.post('/forget-password', authCtrlr.forgetPassword);
authRoute.post('/reset-password', authCtrlr.resetPassword);

export default authRoute;
