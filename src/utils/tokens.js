import jwt from 'jsonwebtoken';
import { customEnv } from '../config/index.js';

export const generateTokensAndSetCookies = (res, userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    customEnv.accessTokenSecret,
    { expiresIn: customEnv.accessTokenExpireTime } // e.g., '15m'
  );

  const refreshToken = jwt.sign(
    { id: userId },
    customEnv.refreshTokenSecret,
    { expiresIn: customEnv.refreshTokenExpireTime } // e.g., '7d'
  );

  // Set tokens as HTTP-only cookies
  res.cookie('accessToken', accessToken, {
    maxAge: 15 * 60 * 1000, // 15 minutes
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  return { accessToken, refreshToken };
};
