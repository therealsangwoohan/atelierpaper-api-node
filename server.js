require('dotenv').config();

const http = require('http');
const { MongoClient } = require('mongodb');
const { usersRoutes } = require('./routes/usersRoutes');
const { projectsRoutes } = require('./routes/projectsRoutes');
const { imagesRoutes } = require('./routes/imagesRoutes');

let projectsCollection;
let usersCollection;

const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');

  if (/\/api\/users(\/.*)?$/.test(request.url)) {
    usersRoutes(request, response, usersCollection);
  } else if (/\/api\/projects(\/.*)?$/.test(request.url)) {
    projectsRoutes(request, response, projectsCollection);
  } else if (/\/api\/images(\/.*)?$/.test(request.url)) {
    imagesRoutes(request, response);
  } else {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html');
    response.write('<h1>Page Not Found</h1>');
    response.end();
  }
});

MongoClient.connect(process.env.DATABASE_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, mongoClient) => {
    const mainDatabase = mongoClient.db('main');
    projectsCollection = mainDatabase.collection('projects');
    usersCollection = mainDatabase.collection('users');
    server.listen(
      5000,
      'localhost',
      () => console.log('Server is running...'),
    );
  });
