import { React, useState, useEffect } from "react";
import DisplayData from "./components/DisplayData";

const App = () => {
  const [countries, setCountries] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [weather, setWeather] = useState([]);
  const handleChange = (event) => setCountries(event.target.value);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountryData([...data]);
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: 600, marginLeft: "40px" }}>
      <p>
        Find Countries
        <input
          type="text"
          value={countries}
          onChange={handleChange}
          style={{
            marginLeft: "5px",
          }}
        />
      </p>
      <div>
        <div>
          {!countries ? (
            <p style={{ fontSize: 13 }}>Enter words to filter</p>
          ) : (
            <DisplayData countryData={countryData} countries={countries} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
