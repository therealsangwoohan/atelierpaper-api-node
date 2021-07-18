const fs = require('fs');

function readOneImage(request, response, id, idx) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'image/jpg');
  const readStream = fs.createReadStream(`${process.env.IMAGE_DIRECTORY}${id}/${idx}.jpg`);
  readStream.pipe(response);
}

module.exports = {
  readOneImage,
};
