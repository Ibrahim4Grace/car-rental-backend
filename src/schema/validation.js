import Joi from 'joi';

import { z, ZodDate } from 'zod';
import validator from 'validator';

const sanitizeInput = (value) => {
  return validator.trim(validator.escape(value));
};

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

export const registerSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, { message: 'First name is required' })
    .transform(sanitizeInput),

  last_name: z
    .string()
    .trim()
    .min(1, { message: 'Last name is required' })
    .transform(sanitizeInput),

  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .transform(sanitizeInput),

  password: z
    .string()

    .min(5, { message: 'Password must be at least 5 characters' }),

  confirm_password: z
    .string()

    .min(5, { message: 'Confirm password must be at least 5 characters' })
    .refine((value, ctx) => value === ctx.parent.password, {
      message: 'Passwords must match',
    }),

  phone_number: z
    .string()
    .trim()
    .min(6, { message: 'Phone number must be at least 6 characters' })
    .transform(sanitizeInput),

  gender: z
    .string()
    .trim()
    .min(1, { message: 'Gender is required' })
    .transform(sanitizeInput),
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

export const carSchema = z.object({
  model: z.string().trim().min(1, 'Model is required').transform(sanitizeInput),
  brand: z.string().trim().min(1, 'brand is required').transform(sanitizeInput),
  state: z.string().trim().min(1, 'state is required').transform(sanitizeInput),
  year: z
    .string()
    .trim()
    .refine((value) => !isNaN(Number(value)), 'Year must be a valid number')
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
  price: z
    .string()
    .trim()
    .refine((value) => !isNaN(Number(value)), 'Price must be a valid number')
    .transform((value) => Number(value, sanitizeInput)),
});
