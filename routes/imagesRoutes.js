const { readOneImage } = require('../controllers/imagesControllers');

function projectsRoutes(request, response) {
  if (request.method === 'GET' && /\/api\/images\/\w+\/\w+$/.test(request.url)) {
    const id = request.url.split('/')[3];
    const idx = request.url.split('/')[4];
    readOneImage(request, response, id, idx);
  } else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html');
    response.write('<h1>Page Not Found</h1>');
    response.end();
  }
}

module.exports = {
  projectsRoutes,
};
