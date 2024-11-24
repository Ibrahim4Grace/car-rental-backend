import jwt from 'jsonwebtoken';
import { customEnv } from '../config/index.js';
import { Unauthorized, asyncHandler } from '../middlewares/index.js';

export const requireAuth = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    throw new Unauthorized('Sign in to access this page');
  }

  jwt.verify(accessToken, customEnv.jwtSecret, (err, decodedAccessToken) => {
    if (err) {
      throw new Unauthorized('Sign in to access this page');
    } else {
      req.user = decodedAccessToken;
      next();
    }
  });
});
