import express from 'express';
const router = express.Router();

// Import route handlers
import pageRoute from './pageRoute.js';
import authRoute from './authRoute.js';
import userRoute from './userRoute.js';
import adminRoute from './adminRoute.js';

// Mount the landing page route
router.use('/api/v1', pageRoute);
router.use('/api/v1/auth', authRoute);
router.use('/api/v1/user', userRoute);
router.use('/api/v1/admin', adminRoute);

export default router;
