import Joi from 'joi';

export const contactUsSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.empty': 'First name is required',
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last name is required',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Phone number is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid',
  }),
  subject: Joi.string().required().messages({
    'string.empty': 'Subject is required',
  }),
  message: Joi.string().min(6).max(250).required().messages({
    'string.empty': 'Message is required',
    'string.min': 'Message must be at least 6 characters',
    'string.max': 'Message cant be more than 250 characters',
  }),
});

export const bookingSchema = Joi.object({
  carType: Joi.string().required().messages({
    'string.empty': 'Car type is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid',
  }),
  name: Joi.string().required().messages({
    'string.empty': 'Name type is required',
  }),
  pickUpLocation: Joi.string().required().messages({
    'string.empty': 'Pick up location is required',
  }),
  dropOffLocation: Joi.string().required().messages({
    'string.empty': 'Drop off location is required',
  }),
  pickUpDate: Joi.string().required().messages({
    'string.empty': 'pick up date is required',
  }),
  pickUpTime: Joi.string().required().messages({
    'string.empty': 'pick up time is required',
  }),
  dropOffDate: Joi.string().required().messages({
    'string.empty': 'Drop off date is required',
  }),
  dropOffTime: Joi.string().required().messages({
    'string.empty': 'Drop off time is required',
  }),
});

export const authSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'string.empty': 'First name is required',
  }),
  last_name: Joi.string().required().messages({
    'string.empty': 'Last name is required',
  }),
  email: Joi.string().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid',
  }),
  password: Joi.string().min(5).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least {#limit} characters',
    'any.required': 'Password is required',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords must match',
    'string.empty': 'Confirm password is required',
    'any.required': 'Password is required',
  }),
  phone_number: Joi.string().min(6).required().messages({
    'string.empty': 'Phone number is required',
    'string.min': 'Phone number must be at least {#limit} characters',
  }),
  gender: Joi.string().required().messages({
    'string.empty': 'Gender is required',
  }),
});

export const userSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.empty': 'First name is required',
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last name is required',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Phone number is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Phone number is required',
  }),
  message: Joi.string().min(6).required().messages({
    'string.empty': 'Message is required',
    'string.min': 'Message must be at least 6 characters',
  }),
});

// export const carSchema = Joi.object({
//   name: Joi.string().required().messages({
//     'string.empty': 'First name is required',
//   }),
//   model: Joi.string().required().messages({
//     'string.empty': 'Last name is required',
//   }),
//   brand: Joi.string().required().messages({
//     'string.empty': 'Phone number is required',
//   }),
//   year: Joi.string().required().messages({
//     'string.empty': 'Phone number is required',
//   }),
//   license_plate: Joi.string().required().messages({
//     'string.empty': 'Phone number is required',
//   }),
//   mileage: Joi.string().required().messages({
//     'string.empty': 'Phone number is required',
//   }),
//   fuel: Joi.string().required().messages({
//     'string.empty': 'Phone number is required',
//   }),
//   seats: Joi.string().required().messages({
//     'string.empty': 'Phone number is required',
//   }),
// });

import { z } from 'zod';
import validator from 'validator';

const sanitizeInput = (value) => {
  return validator.escape(validator.trim(value));
};

export const carSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').transform(sanitizeInput),
  model: z.string().trim().min(1, 'Model is required').transform(sanitizeInput),
  brand: z.string().trim().min(1, 'brand is required').transform(sanitizeInput),
  year: z
    .string()
    .trim()
    .min(1, 'year number is required')
    .transform(sanitizeInput),
  license_plate: z
    .string()
    .trim()
    .min(1, 'Plate number is required')
    .transform(sanitizeInput),
  mileage: z
    .string()
    .trim()
    .min(1, 'mileage is required')
    .transform(sanitizeInput),
  rent_price: z
    .string()
    .trim()
    .min(1, 'rent price is required')
    .transform(sanitizeInput),
});
