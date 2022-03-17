const mongoose = require("mongoose");
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://yasir:${password}@part3.dwc38.mongodb.net/PhonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const phonebookSchema = mongoose.Schema({
  id: Number,
  name: String,
  number: Number,
  date: Date,
});

const Person = mongoose.model("Person", phonebookSchema);

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((person) => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
} else {
  const newPerson = new Person({
    id: new Date().getTime(),
    name,
    number,
    date: new Date(),
  });

  newPerson.save().then((result) => {
    console.log(
      `Added ${name} number ${number} to the phonebook successfully!`
    );
    mongoose.connection.close();
  });
}
