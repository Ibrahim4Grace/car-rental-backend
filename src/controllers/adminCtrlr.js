import { APIError, asyncHandler } from '../middlewares/index.js';
// import * as userService from '../services/userService.js';
// import logger from '../../logger/logger.js';

export const loginPage = asyncHandler(async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export const loginPs = asyncHandler(async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
