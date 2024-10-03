import express from 'express';
import * as adminCtrlr from '../controllers/index.js';
import { adminImage, carsImage } from '../config/index.js';
import { validateData } from '../middlewares/index.js';
import { carSchema } from '../schema/index.js';

const adminRoute = express.Router();

adminRoute.post(
  '/uploadImage',
  // verifyUserToken,
  // getAdminById,
  adminImage.single('image'),
  adminCtrlr.uploadAdminImage
);

adminRoute.post(
  '/cars',
  validateData(carSchema),
  // verifyUserToken,
  // getAdminById,
  carsImage.single('images'),
  adminCtrlr.addCars
);

export default adminRoute;
