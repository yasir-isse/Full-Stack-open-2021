import axios from "axios";

const apiKey = "2071696fb9fb4315bfc91354221303";

const baseUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}`;

export const getWeatherData = (city) =>
  axios.get(`${baseUrl}&q=${city}&aqi=yes`);
