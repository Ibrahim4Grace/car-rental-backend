import express from 'express';
import * as authCtrlr from '../controllers/index.js';
import { validateData } from '../middlewares/index.js';
import {
  registerSchema,
  verifySchema,
  forgetPswdSchema,
  resetPswdSchema,
  loginSchema,
  newPasswordSchema,
} from '../schema/index.js';

const authRoute = express.Router();

authRoute.post(
  '/register',
  validateData(registerSchema),
  authCtrlr.registerPage
);

authRoute.post('/verify-otp', validateData(verifySchema), authCtrlr.verifyOtp);

authRoute.post(
  '/admin/password/forgot',
  validateData(forgetPswdSchema),
  authCtrlr.adminForgotPassword
);

authRoute.post(
  '/admin/password/verify-otp',
  validateData(verifySchema),
  authCtrlr.adminVerifyPasswordOtp
);

authRoute.post(
  '/admin/password/reset',
  validateData(newPasswordSchema),
  authCtrlr.adminResetPassword
);

authRoute.post('/admin/login', validateData(loginSchema), authCtrlr.adminLogin);
authRoute.post('/user/login', validateData(loginSchema), authCtrlr.userLogin);
authRoute.post(
  '/user/password/forgot',
  validateData(forgetPswdSchema),
  authCtrlr.userForgotPassword
);

authRoute.post(
  '/user/password/verify-otp',
  validateData(verifySchema),
  authCtrlr.userVerifyPasswordOtp
);

authRoute.post(
  '/user/password/reset',
  validateData(newPasswordSchema),
  authCtrlr.userResetPassword
);
authRoute.post('/token/refresh', authCtrlr.refreshAccessToken);

authRoute.delete('/logout', authCtrlr.logOutPage);

export default authRoute;
