import Joi from 'joi';

const contactUsSchema = Joi.object({
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

export default contactUsSchema;
