import React from "react";

function FilteredCountries({
  filtered,
  showMoreInfo,
  hideText,
  handleClick,
  moreInfo,
  buttonText,
  Country,
  weather,
  setWeather,
}) {
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
            <Country
              country={country[0]}
              weather={weather}
              setWeather={setWeather}
            />
          );
        })}
    </div>
  ));
}

export default FilteredCountries;
