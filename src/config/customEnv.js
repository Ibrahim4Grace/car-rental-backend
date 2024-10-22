import dotenv from 'dotenv';

dotenv.config();

export const customEnv = {
  port: process.env.PORT,

  nodeEnv: process.env.NODE_ENV || 'development',

  mongoDbURI: process.env.MONGODB_URI,

  sessionSecret: process.env.SESSION_SECRET,

  maxFailedAttempt: process.env.MAX_FAILED_ATTEMPTS,

  payStackSecret: process.env.PAYSTACK_SECRET,

  jwtSecret: process.env.JWT_SECRET,

  userAccessToken: process.env.USER_ACCESS_TOKEN,
  userRefreshToken: process.env.USER_REFRESH_TOKEN,
  userAccessTokenExpireTime: process.env.USER_ACCESS_TOKEN_EXPIRATION_TIME,
  userRefreshTokenExpireTime: process.env.USER_REFRESH_TOKEN_EXPIRATION_TIME,

  mailerService: process.env.MAILER_SERVICE,
  nodemailerEmail: process.env.NODEMAILER_EMAIL,
  nodemailerPassword: process.env.NODEMAILER_PASSWORD,

  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleOauthRedirectUrl: process.env.GOOGLE_0AUTH_REDIRECTURL,

  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiName: process.env.CLOUDINARY_API_NAME,
  cloudinarySecretName: process.env.CLOUDINARY_SECRET_NAME,

  paystackSecret: process.env.PAYSTACK_SECRET,

  cors: process.env.CORS_WHITELIST,
};
