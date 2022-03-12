import { React } from "react";

function Persons({ filterNames, persons, deleteContact }) {
  return (
    <div>
      {filterNames === ""
        ? persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
              <button id={person.id} onClick={(e) => deleteContact(e)}>
                Delete
              </button>
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
                <button id={fill.id} onClick={(e) => deleteContact(e)}>
                  Delete
                </button>
              </p>
            ))}
    </div>
  );
}

export default Persons;
