import axios from "axios";
const baseUrl = "http://localhost:3005/persons";

const getAllContacts = () => axios.get(baseUrl);

const createContact = (contact) => axios.post(baseUrl, contact);

const updatContact = (id, contact) =>
  axios
    .put(`${baseUrl}/${id}`, contact)
    .then((response) => response.data)
    .catch((err) => {
      return new Error(err) === false;
    });

const deleteContact = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAllContacts, createContact, updatContact, deleteContact };
