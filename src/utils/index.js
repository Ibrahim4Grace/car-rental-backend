import { sanitizeInput, sanitizeObject } from './sanitize.js';
import { log } from './logger.js';
import { sendMail } from './mail.js';
export * from './emailTemplates.js';
import { generateOTP, saveOTPToDatabase, verifyOTP } from './authUtils.js';

export {
  sanitizeInput,
  sanitizeObject,
  generateOTP,
  saveOTPToDatabase,
  verifyOTP,
  log,
  sendMail,
};
