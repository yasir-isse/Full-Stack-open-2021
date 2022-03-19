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
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res) => {
  const { body } = req;
  if (!body.name) {
    return res.status(400).json({ error: "name missing" });
  }
  if (!body.number) {
    return res.status(400).json({ error: "number missing" });
  }
  Person.find({ name: req.body.name })
    .then((person) => {
      if (person.length > 0) {
        res.status(400).json({ error: "name already exists" });
      } else {
        const id = new Date().getTime();
        const newPerson = {
          id,
          ...req.body,
          date: new Date(),
        };

        Person.insertMany(newPerson, {
          ordered: false,
          rawResult: true,
        }).then((result) => {
          if (result.mongoose.validationErrors[0]) {
            res.json(result.mongoose.validationErrors[0]);
          } else {
            res.json(newPerson);
          }
        });
      }
    })
    .catch((err) => next(err));
});

app.put("/api/persons", (req, res) => {
  Person.updateOne(
    { name: req.body.name },
    { ...req.body },
    { new: true, runValidators: true, context: "query" }
  )
    .then((result) => {
      if (result.mongoose.validationErrors[0]) {
        res.json(result.mongoose.validationErrors[0]);
      } else {
        res.json(result);
      }
    })
    .catch((err) => next(err));
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

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (err.name === "ValidationError") {
    return res.status(400).send({ error: err.message });
  }

  next(err);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
