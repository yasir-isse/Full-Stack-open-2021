import React from "react";

function FilteredCountries({
  filtered,
  showMoreInfo,
  show,
  handleClick,
  moreInfo,
  Country,
  weather,
  setWeather,
}) {
  return filtered.map((name) => (
    <div key={name.name.common}>
      <p>
        {name.name.common}
        <button
          type="button"
          name={name.name.common}
          style={{ marginLeft: "5px" }}
          onClick={handleClick}
        >
          {moreInfo === name.name.common && show
            ? "Hide details"
            : "Show details"}
        </button>
      </p>
      {moreInfo === name.name.common && show && (
        <div>{showMoreInfo(moreInfo)}</div>
      )}
    </div>
  ));
}

export default FilteredCountries;
