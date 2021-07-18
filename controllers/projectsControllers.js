const formidable = require('formidable');
const fs = require('fs');
const { ObjectID } = require('mongodb');

async function createOneProject(request, response, projectsCollection) {
  const id = (await projectsCollection.insertOne({})).insertedId;

  fs.mkdirSync(`${process.env.IMAGE_DIRECTORY}${id}/`);

  const form = formidable({ multiples: true });
  form.parse(request, async (err, fields, files) => {
    const imageURLs = [];
    files.images.forEach((image, idx) => {
      fs.writeFileSync(`./images/${id}/${idx}.jpg`, fs.readFileSync(image.path));
      imageURLs.push(`${process.env.REQUEST_URL}/api/images/${id}/${idx}`);
    });

    const aProject = {
      title: fields.title,
      body: fields.body,
      imageURLs,
    };

    await projectsCollection.updateOne({ _id: ObjectID(id) }, { $set: aProject });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(aProject));
    response.end();
  });
}

async function readAllProjects(request, response, projectsCollection) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.write(JSON.stringify(await projectsCollection.find().toArray()));
  response.end();
}

async function readOneProject(request, response, id, projectsCollection) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.write(JSON.stringify(await projectsCollection.findOne({ _id: ObjectID(id) })));
  response.end();
}

function updateOneProject(request, response, id, projectsCollection) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.write('<h1>updateOneProject</h1>');
  response.end();
}

function deleteOneProject(request, response, id, projectsCollection) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.write('<h1>deleteOneProject</h1>');
  response.end();
}

module.exports = {
  createOneProject,
  readAllProjects,
  readOneProject,
  updateOneProject,
  deleteOneProject,
};
