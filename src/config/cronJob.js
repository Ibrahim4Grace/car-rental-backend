import https from 'https';
import cron from 'node-cron';
import logger from '../../logger/logger.js';

const url = 'https://car-rental-backend-lhm2.onrender.com';

function keepAlive(url) {
  https
    .get(url, (res) => {
      console.log(`Status: ${res.statusCode}`);
    })
    .on('error', (error) => {
      logger.error(`Error: ${error.message}`);
    });
}

cron.schedule('*/5 * * * *', () => {
  keepAlive(url);
  console.log('Pinging the server every 5 minutes');
});

export default keepAlive;
