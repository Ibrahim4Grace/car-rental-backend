import { z, ZodDate } from 'zod';
import validator from 'validator';

const sanitizeInput = (value) => {
  return validator.trim(validator.escape(value));
};

export const bookingSchema = z.object({
  carType: z
    .string()
    .trim()
    .min(1, 'Car type is required')
    .transform(sanitizeInput),

  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .transform(sanitizeInput),

  name: z.string().trim().min(1, 'Name is required').transform(sanitizeInput),

  pickUpLocation: z
    .string()
    .trim()
    .min(1, 'Pick up location is required')
    .transform(sanitizeInput),

  dropOffLocation: z
    .string()
    .trim()
    .min(1, 'Drop off location is required')
    .transform(sanitizeInput),

  pickUpDate: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date().min(new Date(), 'Pick up date must be in the future')),

  pickUpTime: z
    .string()
    .trim()
    .min(1, 'Pick up time is required')
    .transform(sanitizeInput),

  dropOffDate: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date().min(new Date(), 'Drop off date must be in the future')),

  dropOffTime: z
    .string()
    .trim()
    .min(1, 'Drop off time is required')
    .transform(sanitizeInput),

  // pickUpDate: ZodDate.parse({ required_error: 'Pick up date is required' }).transform(sanitizeInput),

  // pickUpTime: ZodDate.parse({ required_error: 'Pick up time is required' }).transform(sanitizeInput),

  // dropOffDate: ZodDate.parse({ required_error: 'Drop off date is required' }).transform(sanitizeInput),

  // dropOffTime: ZodDate.parse({ required_error: 'Drop off time is required' }).transform(sanitizeInput),
});

export const contactUsSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .transform(sanitizeInput),

  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .transform(sanitizeInput),

  phone: z
    .string()
    .trim()
    .min(6, 'Phone number must be at least 6 characters')
    .transform(sanitizeInput),

  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .transform(sanitizeInput),

  subject: z
    .string()
    .trim()
    .min(1, 'Subject is required')
    .transform(sanitizeInput),

  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .max(250)
    .transform(sanitizeInput),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, 'First name is required')
      .transform(sanitizeInput),

    lastName: z
      .string()
      .trim()
      .min(1, 'Last name is required')
      .transform(sanitizeInput),

    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Invalid email address')
      .transform(sanitizeInput),

    password: z.string().min(5, 'Password must be at least 5 characters'),

    confirm_password: z
      .string()
      .min(5, 'Confirm password must be at least 5 characters'),

    phone: z
      .string()
      .trim()
      .min(6, 'Phone number must be at least 6 characters')
      .transform(sanitizeInput),

    gender: z
      .string()
      .trim()
      .min(1, 'Gender is required')
      .transform(sanitizeInput),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        path: ['confirm_password'],
        message: 'Passwords must match',
      });
    }
  });

export const verifySchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .transform(sanitizeInput),
  otp: z.string().trim().min(1, 'otp is required').transform(sanitizeInput),
});

export const forgetPswdSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .transform(sanitizeInput),
});

export const resetPswdSchema = z.object({
  token: z.string().trim().min(1, 'Token is required').transform(sanitizeInput),
  newPassword: z
    .string()
    .trim()
    .min(1, 'New password is required')
    .transform(sanitizeInput),
});

export const userSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .transform(sanitizeInput),

  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .transform(sanitizeInput),

  phone: z
    .string()
    .trim()
    .min(6, 'Phone number must be at least 6 characters')
    .transform(sanitizeInput),

  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .transform(sanitizeInput),
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
