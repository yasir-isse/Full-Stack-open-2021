import axios from "axios";

export const getCountryData = () =>
  axios.get("https://restcountries.com/v3.1/all");
