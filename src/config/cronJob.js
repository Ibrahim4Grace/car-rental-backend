// import https from 'https';
// import cron from 'node-cron';
// import logger from '../../logger/logger.js';

// const url = 'https://car-rental-backend-lhm2.onrender.com';

// function keepAlive(url) {
//   https
//     .get(url, (res) => {
//       console.log(`Status: ${res.statusCode}`);
//     })
//     .on('error', (error) => {
//       logger.error(`Errors: ${error.message}`);
//     });
// }

// cron.schedule('*/5 * * * *', () => {
//   keepAlive(url);
//   console.log('Pinging the server every 5 minutes');
// });

// export default keepAlive;

import https from 'https';
import cron from 'node-cron';
import logger from '../../logger/logger.js';

const url = 'https://www.google.com';

function keepAlive(url) {
  https
    .get(url, (res) => {
      const timestamp = new Date().toISOString();
      console.log(`${timestamp} - Status: ${res.statusCode}`);
      if (res.statusCode !== 200) {
        logger.error(`${timestamp} - Non-200 status code: ${res.statusCode}`);
      }
    })
    .on('error', (error) => {
      const timestamp = new Date().toISOString();
      logger.error(`${timestamp} - Error message: ${error.message}`);
      logger.error(`${timestamp} - Error code: ${error.code}`);
      logger.error(`${timestamp} - Error stack: ${error.stack}`);
      logger.error(`${timestamp} - URL: ${url}`);
    });
}

cron.schedule('*/5 * * * *', () => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - Pinging the server every 5 minutes`);
  keepAlive(url);
});

export default keepAlive;
