const fs = require('fs');
const crypto = require('crypto');
const https = require('https');

module.exports = async (url) => new Promise((resolve, reject) => {
  const fileName = crypto.randomBytes(16).toString('hex');
  const filePath = `./upload/${fileName}.png`;
  const file = fs.createWriteStream(filePath);
  https.get(url, (response) => {
    const stream = response.pipe(file);
    stream.on('finish', () => resolve(filePath.slice(1)));
    stream.on('error', (e) => reject(e));
  });
});
