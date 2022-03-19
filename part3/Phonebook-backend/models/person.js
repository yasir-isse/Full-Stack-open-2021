const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => console.log("successfully connected to mongoDB!"))
  .catch((err) => console.log("error occured connecting to mongoDB", err));

const phonebookSchema = mongoose.Schema({
  id: Number,
  name: { type: String, minLength: 5, required: true },
  number: { type: Number, min: 9, required: true },
  date: Date,
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", phonebookSchema);
