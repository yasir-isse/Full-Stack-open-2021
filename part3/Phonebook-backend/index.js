const persons = require("./persons");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let people = persons.persons;

const port = 3001;

app.get("/api/persons", (req, res) => {
  res.send(people);
});

app.get("/info", (req, res) => {
  const par = `<p>Phonebook has info for ${people.length} people</p>`;
  const date = new Date();
  res.send(`<div>${par} ${date}</div>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = people.filter((person) => person.id === id);
  if (person.length) {
    res.send(person);
  } else {
    res.send({ error: "user id not found!" });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const persons = people.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({ error: "name missing" });
  }
  if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  }
  people.filter((person) => {
    if (person.name.toLowerCase() === body.name.toLowerCase()) {
      return res.status(400).json({ error: "name must be unique" });
    }
  });
  const id = Math.floor(Math.random() * 5000 + 1);
  const person = {
    id,
    ...body,
    date: new Date(),
  };
  const newPeople = people.concat(person);
  res.send(newPeople);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
