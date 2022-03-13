import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const baseUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}`;

export const getWeatherData = (city) =>
  axios.get(`${baseUrl}&q=${city}&aqi=yes`);
