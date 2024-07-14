import customEnv from '../config/customEnv.js';

const whitelist = customEnv.cors.split(',');

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 201,
};

export default corsOptions;
