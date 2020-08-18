const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {
    id : uuid(),
    title ,
    url   ,
    techs ,
    likes : 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  
  const i = repositories.findIndex(repository => repository.id === id);

  if (i < 0)
  {
    return response.status(400).json({error: 'Repository Not Found.'});
  }

  const {url, title, techs} = request.body;

  repositories[i].url   = url;
  repositories[i].title = title;
  repositories[i].techs = techs;

  return response.status(200).json(repositories[i]);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const i = repositories.findIndex(repository => repository.id === id);

  if (i < 0)
  {
    return response.status(400).json({error: 'Repository Not Found!'});
  }

  repositories.splice(i,1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository)
  {
    return response.status(400).json({error: 'Repository Not Found!'});
  }

  repository.likes++;  

  return response.json(repository);
});

module.exports = app;
