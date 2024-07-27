import express from 'express';
const router = express.Router();

// Import route handlers
import pageRoute from './pageRoute.js';
import authRoute from './authRoute.js';
import userRoute from './userRoute.js';
import adminRoute from './adminRoute.js';

// Mount the landing page route
router.use('/api/v1', pageRoute);
router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/admin', adminRoute);

export default router;
