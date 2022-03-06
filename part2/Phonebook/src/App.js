import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterNames, setFilterNames] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const persons = response.data;
      setPersons(persons);
    });
  }, []);
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
