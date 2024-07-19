import https from 'https';
import cron from 'node-cron';

const url = 'https://car-rental-backend-lhm2.onrender.com';

function keepAlive(url) {
  https
    .get(url, (res) => {
      console.log(`Status: ${res.statusCode}`);
    })
    .on('error', (error) => {
      console.error(`Error: ${error.message}`);
    });
}

cron.schedule('*/5 * * * *', () => {
  keepAlive(url);
  console.log('Pinging the server every 5 minutes');
});

export default keepAlive;
