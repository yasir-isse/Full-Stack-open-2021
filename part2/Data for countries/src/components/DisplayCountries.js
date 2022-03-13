import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import Country from "./Country";
import FilteredCountries from "./FilteredCountries";

function DisplayCountries({ countryData, countries }) {
  const [display, setDisplay] = useState(false);
  const [moreInfo, setMoreInfo] = useState("");
  const [buttonText, setButtonText] = useState("Show details");
  const [hideText, setHideText] = useState(false);
  const [weather, setWeather] = useState({});

  const filtered = countryData.filter((obj) =>
    obj.name.common.toLowerCase().startsWith(countries)
  );

  const handleClick = (event) => {
    setMoreInfo(event.target.name);
    setDisplay(!display);
    setHideText(!hideText);
  };
  const showMoreInfo = (value) => {
    const data = filtered.filter((item) => item.name.common === value);
    const country = data[0];
    return (
      <Country country={country} weather={weather} setWeather={setWeather} />
    );
  };
  if (filtered.length === 1) {
    const [item] = filtered;
    return <Country country={item} weather={weather} setWeather={setWeather} />;
  } else if (filtered.length > 10) {
    return (
      <p style={{ fontSize: 13 }}>Too many matches, please add more filters</p>
    );
  } else {
    return (
      <FilteredCountries
        filtered={filtered}
        showMoreInfo={showMoreInfo}
        hideText={hideText}
        handleClick={handleClick}
        moreInfo={moreInfo}
        buttonText={buttonText}
        Country={Country}
        weather={weather}
        setWeather={setWeather}
      />
    );
  }
}

export default DisplayCountries;
