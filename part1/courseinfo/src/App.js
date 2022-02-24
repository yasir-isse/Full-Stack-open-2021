const Course = ({ courseName }) => <h1>{courseName}</h1>;
const Part = ({ parts, num }) => (
  <p>
    {parts[num].name} {parts[num].exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    <Part parts={parts} num={0} />
    <Part parts={parts} num={1} />
    <Part parts={parts} num={2} />
  </div>
);
const Total = ({ parts }) => (
  <p>
    Number of exercises:{" "}
    {parts[0].exercises + parts[1].exercises + parts[2].exercises}
  </p>
);
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Course courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <div style={{ marginTop: "24rem" }}>
        <small>Created by: Yasir Ahmed</small>
      </div>
    </div>
  );
};

export default App;
