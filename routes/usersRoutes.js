function usersRoutes(request, response, usersCollection) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.write('<h1>Users Routes</h1>');
  response.end();
}

module.exports = {
  usersRoutes,
};
