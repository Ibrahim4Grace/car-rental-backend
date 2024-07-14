import { APIError } from '../middlewares/errorMiddleware.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import logger from '../../logger/logger.js';
import { contactUsSchema } from '../validations/index.js';
import { sanitizeInput, sanitizeObject } from '../utils/index.js';
import { ContactUs } from '../models/index.js';
import sendContactUsEmail from '../mailers/contactUsMailer.js';

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
