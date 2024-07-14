import Joi from 'joi';

const userSchema = Joi.object({
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

export default userSchema;
