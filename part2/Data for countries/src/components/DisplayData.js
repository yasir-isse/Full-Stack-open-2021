import React, { useState } from "react";

function DisplayData({ countryData, countries }) {
  const [display, setDisplay] = useState(false);
  const [moreInfo, setMoreInfo] = useState("");
  const [buttonText, setButtonText] = useState("Show details");
  const [hideText, setHideText] = useState(false);

  const filtered = countryData.filter((obj) =>
    obj.name.common.toLowerCase().startsWith(countries)
  );

  const handleClick = (event) => {
    setMoreInfo(event.target.name);
    setDisplay(!display);
    setHideText(!hideText);
  };
  const showMoreInfo = (value) => {
    const country = filtered.filter((item) => item.name.common === value);
    return (
      <div>
        <h1> {country[0].name.common}</h1>
        <p>Capital: {country[0].capital[0]}</p>
        <p>Area: {country[0].area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country[0].languages).map((language, index) => {
            return <li key={index}>{language}</li>;
          })}
        </ul>
        <img
          src={country[0].flags.svg}
          alt="country flag"
          style={{ width: 150, height: "auto" }}
        />
      </div>
    );
  };
  if (filtered.length === 1) {
    const [item] = filtered;
    console.log(item);
    return (
      <div>
        <h1> {item.name.common}</h1>
        <p>Capital: {item.capital[0]}</p>
        <p>Area: {item.area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(item.languages).map((language, index) => {
            return <li key={index}>{language}</li>;
          })}
        </ul>
        <img
          src={item.flags.svg}
          alt="country flag"
          style={{ width: 150, height: "auto" }}
        />
      </div>
    );
  } else if (filtered.length > 10) {
    return (
      <p style={{ fontSize: 13 }}>Too many matches, please add more filters</p>
    );
  } else {
    return filtered.map((name) => (
      <div key={name.name.common}>
        <p key={name.name.common}>
          {name.name.common}
          <button
            name={name.name.common}
            style={{ marginLeft: "5px" }}
            onClick={handleClick}
          >
            {moreInfo === name.name.common && hideText
              ? "Hide details"
              : buttonText}
          </button>
        </p>
        {moreInfo === name.name.common && hideText && (
          <div>{showMoreInfo(moreInfo)}</div>
        )}
        {filtered
          .filter((item) => item.name.common === "")
          .map((country) => {
            return (
              <div>
                {console.log(country[0])}
                <h1> {country[0].name.common}</h1>
                <p>Capital: {country[0].capital[0]}</p>
                <p>Area: {country[0].area}</p>
                <h3>Languages:</h3>
                <ul>
                  {Object.values(country[0].languages).map(
                    (language, index) => {
                      return <li key={index}>{language}</li>;
                    }
                  )}
                </ul>
                <img
                  src={country[0].flags.svg}
                  alt="country flag"
                  style={{ width: 150, height: "auto" }}
                />
              </div>
            );
          })}
      </div>
    ));
  }
}

export default DisplayData;
