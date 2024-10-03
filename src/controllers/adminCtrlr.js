// import { carSchema } from '../schema/index.js';
import { Car } from '../models/index.js';
import { cloudinary } from '../config/index.js';
import { sanitizeObject, sendMail, log } from '../utils/index.js';
import { APIError, asyncHandler, Conflict } from '../middlewares/index.js';

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
  // const sanitizedBody = sanitizeObject(req.body);
  // const { error, value } = carSchema.validate(sanitizedBody, {
  //   abortEarly: false,
  // });

  // if (error) {
  //   const errors = error.details.map((err) => ({
  //     key: err.path[0],
  //     msg: err.message,
  //   }));
  //   return res.status(400).json({ success: false, errors });
  // }

  const { name, model, brand, year, license_plate, mileage, rent_price } =
    req.body;
  const exisitingCar = await Car.findOne({
    $or: [{ rent_price: rent_price }, { license_plate: license_plate }],
  });

  if (exisitingCar) {
    if (exisitingCar.rent_price === rent_price) {
      throw new Conflict('Price already exists');
    }
    if (exisitingCar.license_plate === license_plate) {
      throw new Conflict('Plate number already registered', 409);
    }
  }

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

  const newCar = new Car({
    name,
    model,
    brand,
    year,
    license_plate,
    mileage,
    rent_price,
    image,
  });

  await newCar.save();
  const redirectUrl = `/admin/car-list`;
  res.status(200).json({
    redirectUrl,
    success: true,
    message: 'Car Registeration successful',
  });
});
