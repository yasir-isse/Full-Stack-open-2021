import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import contacts from "./services/contacts";
import Notification from "./components/Notification";
import "./app.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterNames, setFilterNames] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("green");
  const [show, setShow] = useState(false);

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
      setColor("red");
      setMessage(`Deleted ${deletedContact.name} successfully!`);
      setShow(true);
      setPersons(newContacts);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newName) {
      alert(`${newName} Please add a name`);
      return setNewName("");
    }

    if (persons.every((person) => person.name !== newName.trim())) {
      const newPerson = {
        name: newName.trim(),
        number: newNum,
      };
      contacts.createContact(newPerson).then((response) => {
        setPersons([...persons, newPerson]);
        setColor("green");
        setShow(true);
        setMessage(`Added ${newName} successfully!`);
      });
    } else if (
      persons.some((person) => person.name.trim() === newName.trim())
    ) {
      const contact = persons.find(
        (person) => person.name.trim() === newName.trim()
      );
      if (contact.number !== newNum) {
        window.confirm(
          `${contact.name} is already added to phonebock, replace the old number with a new one?`
        );

        const newPerson = { ...contact, number: newNum };
        if (contacts.updateContact(contact.id, newPerson)) {
          setPersons(
            persons.map((person) =>
              person.name === contact.name ? newPerson : person
            )
          );
          setColor("green");
          setShow(true);
          setNewName("");
          setNewNum("");
          return setMessage(`Updated ${contact.name}'s number Successfully! `);
        } else {
          setColor("red");
          setShow(true);
          setMessage(
            `Information of ${contact.name} has already been removed from the server`
          );
          return setPersons(
            persons.filter((person) => person.name !== contact.name)
          );
        }
      }
    } else {
      setColor("red");
      setMessage(`${newName} is already added to phonebook`);
    }

    setNewName("");
    setNewNum("");
  };

  return (
    <div className="main">
      <h2>Phonebook</h2>
      <Filter handler={handleFilter} state={filterNames} />
      <h3>Add a new contact</h3>
      <div className="msg">
        {show && (
          <Notification
            color={color}
            message={message}
            show={show}
            setShow={setShow}
          />
        )}
      </div>
      <Form
        className="form"
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
