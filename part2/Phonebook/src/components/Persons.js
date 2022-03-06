import React from "react";

function Persons({ filterNames, persons }) {
  return (
    <div>
      {filterNames === ""
        ? persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))
        : persons
            .filter((person) => {
              const name = person.name.toLowerCase();
              return name.startsWith(filterNames.toLowerCase());
            })
            .map((fill) => (
              <p key={fill.id}>
                {fill.name} {fill.number}
              </p>
            ))}
    </div>
  );
}

export default Persons;
