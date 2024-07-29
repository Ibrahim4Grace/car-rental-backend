// /routes/userRoutes.js
import express from 'express';
import * as userCtrlr from '../controllers/index.js';
const router = express.Router();

// Define routes and map them to controller methods
router.post('/users', userCtrlr.createUser); // Create a new user
router.get('/users/:id', userCtrlr.getUserById); // Get a user by ID
router.put('/users/:id', userCtrlr.updateUser); // Update a user by ID
router.delete('/users/:id', userCtrlr.deleteUser); // Delete a user by ID
router.get('/users', userCtrlr.getAllUsers); // Get all users

export default router;
