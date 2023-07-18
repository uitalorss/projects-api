import express, { json } from "express";
import { v4 as uuid } from "uuid";

const app = express();

app.use(json());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return res.status(201).json({message: "Repositório criado"});
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const updatedRepository = req.body;

  const repositoryIndex = repositories.findindex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return res.status(404).json({ error: "Repository not found" });
  }

  const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  repositories[repositoryIndex] = repository;

  return res.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex > 0) {
    return res.status(404).json({ error: "Repository not found" });
  }
  
  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return res.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;

  return res.json({likes});
});

export default app;
