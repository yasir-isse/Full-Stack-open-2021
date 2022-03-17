const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => console.log("successfully connected to mongoDB!"))
  .catch((err) => console.log("error occured connecting to mongoDB", err));

const phonebookSchema = mongoose.Schema({
  id: Number,
  name: String,
  number: Number,
  date: Date,
});

phonebookSchema.set("toJSON", {
  transfrom: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", phonebookSchema);
