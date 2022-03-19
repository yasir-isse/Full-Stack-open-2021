require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Person = require("./models/person");
const person = require("./models/person");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.find({ id: req.params.id })
    .then((person) => {
      if (person.length > 0) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).end();
    });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.deleteOne({ id: req.params.id })
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => console.log(err));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({ error: "name missing" });
  } else if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  } else {
    Person.find({ name: req.body.name })
      .then((person) => {
        if (person.length > 0) {
          res.status(400).json({ error: "name already exists" });
        } else {
          const id = new Date().getTime();
          let newPerson = {
            id,
            ...req.body,
            date: new Date(),
          };
          Person.insertMany(newPerson);
          res.send(newPerson);
        }
      })
      .catch((err) => {
        res.status(500).end();
      });
  }
});

app.put("/api/persons", (req, res) => {
  Person.updateOne({ name: req.body.name }, { ...req.body }, { new: true })
    .then((result) => {
      res.send("User updated");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.get("/info", (req, res) => {
  Person.find({}).then((result) => {
    const numOfPeople = result.length;
    const par = `<p>Phonebook has info for ${numOfPeople} people</p>`;
    const date = new Date();
    res.send(`<div>${par} ${date}</div>`);
  });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
