import axios from "axios";
const baseUrl = "/api/persons";

const getAllContacts = () => axios.get(baseUrl);

const createContact = (contact) => axios.post(baseUrl, contact);

const updateContact = (id, contact) =>
  axios
    .put(`${baseUrl}/${id}`, contact)
    .then((response) => response.data)
    .catch((err) => {
      return new Error(err) === false;
    });

const deleteContact = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAllContacts, createContact, updateContact, deleteContact };
