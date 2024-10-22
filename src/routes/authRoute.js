import express from 'express';
import * as authCtrlr from '../controllers/index.js';
import { validateData } from '../middlewares/index.js';
import {
  registerSchema,
  verifySchema,
  forgetPswdSchema,
  resetPswdSchema,
} from '../schema/index.js';

const authRoute = express.Router();

authRoute.post(
  '/register',
  validateData(registerSchema),
  authCtrlr.registerPage
);

authRoute.post('/verify-otp', validateData(verifySchema), authCtrlr.verifyOtp);

authRoute.post(
  '/forget-password',
  validateData(forgetPswdSchema),
  authCtrlr.forgetPassword
);

authRoute.post(
  '/reset-password',
  validateData(resetPswdSchema),
  authCtrlr.resetPassword
);

export default authRoute;
