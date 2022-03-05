import React from "react";
import Part from "./Part";
import Total from "./Total";

function Content({ course }) {
  return (
    <div>
      {course.parts.map((part, index) => (
        <Part part={part} key={index} />
      ))}
      <Total parts={course.parts} />
    </div>
  );
}

export default Content;
