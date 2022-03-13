import React from "react";
import DisplayWeather from "./DisplayWeather";

function Country({ country, weather, setWeather }) {
  return (
    <div>
      <h1> {country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => {
          return <li key={index}>{language}</li>;
        })}
      </ul>
      <img
        src={country.flags.svg}
        alt="country flag"
        style={{ width: 150, height: "auto" }}
      />
      <DisplayWeather
        country={country}
        weather={weather}
        setWeather={setWeather}
      />
    </div>
  );
}

export default Country;
