import axios from "axios";
const baseUrl = "http://localhost:5000/persons";

const getAllContacts = () => axios.get(baseUrl);

const createContact = (contact) => axios.post(baseUrl, contact);

const updatContact = (id, contact) => axios.put(`${baseUrl}/${id}`, contact);

const deleteContact = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAllContacts, createContact, updatContact, deleteContact };
