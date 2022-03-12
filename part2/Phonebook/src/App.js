import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import contacts from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterNames, setFilterNames] = useState("");

  useEffect(() => {
    contacts.getAllContacts().then((response) => {
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
  const handleDelete = (event) => {
    const deletedContact = persons.find(
      (person) => person.id === Number(event.target.id)
    );
    if (
      window.confirm(
        `Are you sure you want to delete "${deletedContact.name}" ?`
      )
    ) {
      const newContacts = persons.filter(
        (person) => person.id !== deletedContact.id
      );
      contacts.deleteContact(deletedContact.id);
      setPersons(newContacts);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newName === "") {
      alert(`${newName} Please add a name`);
      return setNewName("");
    }

    if (persons.every((person) => person.name !== newName.trim())) {
      const newPerson = {
        name: newName.trim(),
        number: newNum,
        id: persons.length + 1,
      };
      contacts.createContact(newPerson).then((response) => {
        window.confirm(`New user: ${response.data.name} added!`);
        setPersons([...persons, newPerson]);
      });
    } else if (
      persons.some((person) => person.name.trim() === newName.trim())
    ) {
      const contact = persons.find(
        (person) => person.name.trim() === newName.trim()
      );
      if (contact.number !== newNum) {
        if (
          window.confirm(
            `${contact.name} is already added to phonebock,replace the old number with a new one?`
          )
        ) {
          const newPerson = { ...contact, number: newNum };
          contacts
            .updatContact(contact.id, newPerson)
            .then((response) => console.log(response.data));
          setPersons(
            persons.map((person) =>
              person.name === contact.name ? newPerson : person
            )
          );
        }
      }
    } else if (persons.every((person) => person.name !== newName.trim())) {
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
      <Persons
        filterNames={filterNames}
        persons={persons}
        deleteContact={handleDelete}
      />
    </div>
  );
};

export default App;
