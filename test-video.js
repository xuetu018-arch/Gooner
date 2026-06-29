const fs = require('fs');
const { imageSize } = require('image-size');
const { promisify } = require('util');
const sizeOfAsync = promisify(imageSize);

const buf = Buffer.from('AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAA', 'base64');
fs.writeFileSync('test-video.mp4', buf);

sizeOfAsync('test-video.mp4')
  .then(console.log)
  .catch(console.error);
