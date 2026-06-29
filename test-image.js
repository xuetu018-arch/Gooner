const fs = require('fs');
const { imageSize } = require('image-size');
const { promisify } = require('util');
const sizeOfAsync = promisify(imageSize);

const buf = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
fs.writeFileSync('test-image.png', buf);

sizeOfAsync('test-image.png')
  .then(console.log)
  .catch(console.error);
