import Joi from 'joi';

const bookingSchema = Joi.object({
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

export default bookingSchema;
