import { React, useState, useEffect } from "react";
import DisplayCountries from "./components/DisplayCountries";
import { getCountryData } from "./services/fetchCountryData";
import { getWeatherData } from "./services/fetchWeatherData";
const App = () => {
  const [countries, setCountries] = useState("");
  const [countryData, setCountryData] = useState([]);
  const handleChange = (event) => setCountries(event.target.value);

  useEffect(() => {
    getCountryData().then((response) => {
      const data = response.data;
      setCountryData(data);
    });
  }, []);

  return (
    <div
      style={{
        width: 600,
        backgroundColor: "#f2aa4cff",
        margin: "50px auto",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <p>
        Find Countries
        <input
          type="text"
          value={countries}
          onChange={handleChange}
          style={{
            marginLeft: "5px",
            border: "1px solid black",
            padding: "2px",
            borderRadius: "5px",
          }}
        />
      </p>
      <div>
        <div>
          {!countries ? (
            <p style={{ fontSize: 13 }}>Enter words to filter</p>
          ) : (
            <DisplayCountries countryData={countryData} countries={countries} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
