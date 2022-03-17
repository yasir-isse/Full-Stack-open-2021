require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.find({ id: req.params.id }).then((person) => res.json(person));
});

app.delete("/api/persons/:id", (req, res) => {
  Person.deleteOne({ id: req.params.id }).then((result) => {
    res.status(204).end();
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({ error: "name missing" });
  }
  if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  }
  // Person.find({ name: body.name, number: body.number }).then((result) => {
  //   if (result.length > 0) {
  //     return res.status(400).json({ error: "same user exists" });
  //   } else {
  const id = Math.floor(Math.random() * 5000 + 1);
  const newPerson = {
    id,
    ...body,
    date: new Date(),
  };
  Person.insertMany(newPerson);
  res.send(newPerson);
  // }
  // });
});

app.get("/info", (req, res) => {
  Person.find({}).then((result) => {
    const numOfPeople = result.length;
    const par = `<p>Phonebook has info for ${numOfPeople} people</p>`;
    const date = new Date();
    res.send(`<div>${par} ${date}</div>`);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
