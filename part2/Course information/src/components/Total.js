import React from "react";

function Total({ parts }) {
  return (
    <p style={{ fontWeight: "bold" }}>
      Total of{" "}
      {parts.reduce((sum, part) => {
        return sum + part.exercises;
      }, 0)}{" "}
      exercises
    </p>
  );
}

export default Total;
