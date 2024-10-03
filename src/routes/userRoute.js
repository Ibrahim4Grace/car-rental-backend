// /routes/userRoutes.js
import express from 'express';
import * as userCtrlr from '../controllers/index.js';
import { userImage } from '../config/index.js';
const userRoute = express.Router();

userRoute.post(
  '/uploadImage',
  // verifyUserToken,
  // getAdminById,
  userImage.single('image'),
  userCtrlr.uploadUserImage
);

export default userRoute;
