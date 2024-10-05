import { Car } from '../models/index.js';
import { cloudinary } from '../config/index.js';
import { sendMail, log } from '../utils/index.js';
import {
  asyncHandler,
  Conflict,
  ResourceNotFound,
} from '../middlewares/index.js';

export const uploadAdminImage = asyncHandler(async (req, res) => {
  const user = req.currentUser;

  const file = req.file;
  if (!file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded.',
    });
  }

  const cloudinaryResult = await cloudinary.uploader.upload(file.path);

  const image = {
    imageId: cloudinaryResult.public_id,
    imageUrl: cloudinaryResult.secure_url,
  };
  user.image = image;
  await user.save();
  const callbackUrl = '/admin/index';
  return res.status(200).json({
    callbackUrl,
    success: true,
    message: 'Image uploaded successfully',
  });
});

export const addCars = asyncHandler(async (req, res) => {
  const { model, brand, year, license_plate, mileage, price, state } = req.body;

  const existingCar = await Car.findOne({
    license_plate: license_plate,
  });
  if (existingCar) {
    if (existingCar.license_plate === license_plate) {
      throw new Conflict('Car with the plate number already registered');
    }
  }

  const file = req.file;
  if (!file) {
    throw new ResourceNotFound('No file uploaded');
  }

  const cloudinaryResult = await cloudinary.uploader.upload(file.path);
  const image = {
    imageId: cloudinaryResult.public_id,
    imageUrl: cloudinaryResult.secure_url,
  };

  const newCar = new Car({
    model,
    brand,
    year,
    license_plate,
    mileage,
    price,
    state,
    image,
  });

  await newCar.save();
  res.status(200).json({
    redirectUrl,
    success: true,
    message: 'Car Registeration successful',
  });
});
