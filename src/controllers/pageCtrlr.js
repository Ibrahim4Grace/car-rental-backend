import { asyncHandler, Conflict } from '../middlewares/index.js';
import { ContactUs, Booking } from '../models/index.js';
import {
  sendMail,
  contactUsConfirmation,
  bookingConfirmation,
} from '../utils/index.js';

export const createBooking = asyncHandler(async (req, res) => {
  const {
    carType,
    email,
    name,
    pickUpLocation,
    dropOffLocation,
    pickUpDate,
    pickUpTime,
    dropOffDate,
    dropOffTime,
  } = req.body;

  const existingBooking = await Booking.findOne({
    carType: carType,
    pickUpLocation: pickUpLocation,
    dropOffLocation: dropOffLocation,
    pickUpDate: pickUpDate,
    pickUpTime: pickUpTime,
    dropOffDate: dropOffDate,
    dropOffTime: dropOffTime,
  });
  if (existingBooking) {
    throw new Conflict('Booking already exists');
  }

  const newBooking = new Booking({
    carType,
    email,
    name,
    pickUpLocation,
    dropOffLocation,
    pickUpDate,
    pickUpTime,
    dropOffDate,
    dropOffTime,
  });
  await newBooking.save();

  const emailContent = await bookingConfirmation(newBooking);
  await sendMail(emailContent);

  res.status(201).json({ message: 'Booking created successfully', newBooking });
});

export const contantUsPage = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, email, subject, message } = req.body;

  const newContactUs = new ContactUs({
    firstName,
    lastName,
    phone,
    email,
    subject,
    message,
  });
  await newContactUs.save();

  const emailContent = contactUsConfirmation(newContactUs, message);
  await sendMail(emailContent);

  res.status(201).json({
    success: true,
    message: 'Message sent successful',
  });
});
