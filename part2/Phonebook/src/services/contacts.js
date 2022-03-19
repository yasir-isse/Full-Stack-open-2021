import axios from "axios";
const baseUrl = "/api/persons";

const getAllContacts = () => axios.get(baseUrl);

const createContact = (contact) => axios.post(baseUrl, contact);

const updateContact = (contact) =>
  axios
    .put(`${baseUrl}/`, contact)
    .then((response) => response.data)
    .catch((err) => {
      return new Error(err);
    });

const deleteContact = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAllContacts, createContact, updateContact, deleteContact };
