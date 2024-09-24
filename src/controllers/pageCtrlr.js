import { APIError, asyncHandler } from '../middlewares/index.js';
import moment from 'moment';
import { ContactUs, Booking } from '../models/index.js';
import { contactUsSchema, bookingSchema } from '../schema/index.js';
import {
  sanitizeObject,
  log,
  sendMail,
  sendContactUsEmail,
  sendBookingConfirmation,
} from '../utils/index.js';

export const createBooking = asyncHandler(async (req, res) => {
  const sanitizedBody = sanitizeObject(req.body);
  const { error, value } = bookingSchema.validate(sanitizedBody, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => ({
      key: err.path[0],
      msg: err.message,
    }));
    return res.status(400).json({ success: false, errors });
  }
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
  } = value;

  const parsedPickUpDate = moment(
    `${pickUpDate} ${pickUpTime}`,
    'YYYY-MM-DD HH:mm A',
    true
  );
  const parsedDropOffDate = moment(
    `${dropOffDate} ${dropOffTime}`,
    'YYYY-MM-DD HH:mm A',
    true
  );

  if (!parsedPickUpDate.isValid() || !parsedDropOffDate.isValid()) {
    return res.status(400).json({ message: 'Invalid date or time format' });
  }

  const newBooking = new Booking({
    carType,
    email,
    name,
    pickUpLocation,
    dropOffLocation,
    pickUpDate: parsedPickUpDate.toDate(),
    pickUpTime: parsedPickUpDate.format('HH:mm'),
    dropOffDate: parsedDropOffDate.toDate(),
    dropOffTime: parsedDropOffDate.format('HH:mm'),
  });

  await newBooking.save();
  const emailContent = sendBookingConfirmation(newBooking);
  await sendMail(emailContent);

  res.status(201).json({ message: 'Booking created successfully', newBooking });
});

export const contantUsPage = asyncHandler(async (req, res) => {
  const sanitizedBody = sanitizeObject(req.body);
  const { error, value } = contactUsSchema.validate(sanitizedBody, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => ({
      key: err.path[0],
      msg: err.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

  const { firstName, lastName, phone, email, subject, message } = value;

  const newContactUs = new ContactUs({
    firstName,
    lastName,
    phone,
    email,
    subject,
    message,
  });
  await newContactUs.save();
  const emailContent = sendContactUsEmail(newContactUs, message);
  await sendMail(emailContent);

  res.status(201).json({
    success: true,
    message: 'Message sent successful',
  });
});
