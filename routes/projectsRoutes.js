const {
  createOneProject, readAllProjects, readOneProject, updateOneProject, deleteOneProject,
} = require('../controllers/projectsControllers');

function projectsRoutes(request, response, projectsCollection) {
  if (request.method === 'POST' && /\/api\/projects\/?$/.test(request.url)) {
    createOneProject(request, response, projectsCollection);
  } else if (request.method === 'GET' && /\/api\/projects\/?$/.test(request.url)) {
    readAllProjects(request, response, projectsCollection);
  } else if (request.method === 'GET' && /\/api\/projects\/\w+$/.test(request.url)) {
    const id = request.url.split('/')[3];
    readOneProject(request, response, id, projectsCollection);
  } else if (request.method === 'POST' && /\/api\/projects\/\w+$/.test(request.url)) {
    const id = request.url.split('/')[3];
    updateOneProject(request, response, id, projectsCollection);
  } else if (request.method === 'DELETE' && /\/api\/projects\/\w+$/.test(request.url)) {
    const id = request.url.split('/')[3];
    deleteOneProject(request, response, id, projectsCollection);
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
