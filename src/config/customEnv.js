import dotenv from 'dotenv';

dotenv.config();

export const customEnv = {
  port: process.env.PORT,

  nodeEnv: process.env.NODE_ENV || 'development',

  paystackSecret: process.env.PAYSTACK_SECRET,

  cors: process.env.CORS_WHITELIST,

  mongoDbURI: process.env.MONGODB_URI,

  sessionSecret: process.env.SESSION_SECRET,

  jwtSecret: process.env.JWT_SECRET,

  accessToken: process.env.ACCESS_TOKEN,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,

  accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  refreshTokenExpireTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME,

  mailerService: process.env.MAILER_SERVICE,
  nodemailerEmail: process.env.NODEMAILER_EMAIL,
  nodemailerPassword: process.env.NODEMAILER_PASSWORD,

  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleOauthRedirectUrl: process.env.GOOGLE_0AUTH_REDIRECTURL,

  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiName: process.env.CLOUDINARY_API_NAME,
  cloudinarySecretName: process.env.CLOUDINARY_SECRET_NAME,

  companyEmail: process.env.COMPANY_EMAIL,
  companyNumber: process.env.COMPANY_NUMBER,
};
