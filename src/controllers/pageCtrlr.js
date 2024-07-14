import { APIError } from '../middlewares/errorMiddleware.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import logger from '../../logger/logger.js';
import moment from 'moment';
import { sanitizeObject } from '../utils/index.js';
import { ContactUs, NewsLetter, Booking } from '../models/index.js';
import {
  contactUsSchema,
  newsLetterSchema,
  bookingSchema,
} from '../validations/index.js';
import {
  sendContactUsEmail,
  newsLetterMsg,
  sendBookingConfirmation,
} from '../mailers/contactUsMailer.js';

export const createBooking = asyncHandler(async (req, res) => {
  try {
    const sanitizedBody = sanitizeObject(req.body);
    const { error, value } = bookingSchema.validate(sanitizedBody, {
      abortEarly: false,
    });
    console.log('Received booking data:', req.body);

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

    // const car = await Car.findOne({ carType });
    // if (!car) {
    //   return res.status(404).json({ message: 'Car not found' });
    // }

    // Parse and validate dates and times
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
    await sendBookingConfirmation(newBooking);
    console.log(
      'Parsed Pick Up Date:',
      parsedPickUpDate.format('YYYY-MM-DD HH:mm A')
    );
    console.log(
      'Parsed Drop Off Date:',
      parsedDropOffDate.format('YYYY-MM-DD HH:mm A')
    );

    res
      .status(201)
      .json({ message: 'Booking created successfully', newBooking });
  } catch (error) {
    logger.error(error);
  }
});

export const contantUsPage = asyncHandler(async (req, res) => {
  try {
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

    // After contact us, call the email sending function
    await sendContactUsEmail(newContactUs, message);

    res.status(201).json({
      success: true,
      message: 'Message recieved successful',
    });
  } catch (error) {
    logger.error(error);
  }
});

export const CreateNewsletter = asyncHandler(async (req, res) => {
  try {
    const sanitizedBody = sanitizeObject(req.body);
    const { error, value } = newsLetterSchema.validate(sanitizedBody);
    if (error) {
      const errors = error.details.map((err) => ({
        key: err.path[0],
        msg: err.message,
      }));
      return res.status(400).json({ success: false, errors });
    }

    const { subscriberEmail } = value;
    const existingNewsLetter = await NewsLetter.findOne({ subscriberEmail });
    if (existingNewsLetter) {
      throw new APIError('User already subscribed', 400);
    }

    const newNewsLetter = new NewsLetter({
      subscriberEmail,
    });
    await newNewsLetter.save();

    // Call the email sending function to send message to the sender
    await newsLetterMsg(newNewsLetter);

    res
      .status(201)
      .json({ success: true, message: 'Newsletter successfully Joined' });
  } catch (error) {
    logger.error(error);
  }
});
