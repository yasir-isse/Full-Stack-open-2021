import React from "react";
import { useEffect, useState } from "react";
import { getWeatherData } from "../services/fetchWeatherData";

function DisplayWeather({ country, weather, setWeather }) {
  const [icon, setIcon] = useState("");
  const capital = country.capital[0];
  useEffect(() => {
    getWeatherData(capital)
      .then((response) => response.data)
      .then((data) => {
        const countryData = data.current;
        setWeather(countryData);
        setIcon(countryData.condition.icon);
      });
  }, []);
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature {weather.temp_c} Celcius</p>
      <img
        style={{
          display: "block",
          border: "1px solid grey",
          backgroundColor: "#fafafa",
          borderRadius: "5px",
        }}
        src={icon}
        alt={"Weather icon"}
      />
      <p>wind {weather.wind_mph} mph</p>
    </div>
  );
}
export default DisplayWeather;
