import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterNames, setFilterNames] = useState("");

  const handleName = (event) => setNewName(event.target.value);
  const handleNum = (event) => setNewNum(event.target.value);
  const handleFilter = (event) => {
    const value = event.target.value;
    setFilterNames(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName === "") {
      alert(`${newName} Please add a name`);
      return setNewName("");
    }
    let nameValues = [];
    persons.reduce((names, person) => {
      nameValues = [...nameValues, person.name];
    }, []);

    if (!nameValues.includes(newName)) {
      const newPerson = {
        name: newName,
        number: newNum,
        id: persons.length + 1,
      };
      setPersons([...persons, newPerson]);
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewNum("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilter} state={filterNames} />
      <h3>Add a new</h3>
      <Form
        handleSubmit={handleSubmit}
        handleName={handleName}
        handleNum={handleNum}
        newName={newName}
        newNum={newNum}
      />
      <h2>Numbers</h2>
      <Persons filterNames={filterNames} persons={persons} />
    </div>
  );
};

export default App;
