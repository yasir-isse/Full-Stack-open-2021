import { useState } from "react";

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>;

const StatisticLine = (props) => (
  <p>
    {props.text} {props.value}
  </p>
);

const Statistics = (props) => {
  if (props.all.length === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <h4>No Feddback Given</h4>
      </div>
    );
  }
  return (
    <table>
      <caption
        style={{
          fontWeight: "bold",
          textAlign: "left",
          marginTop: "2rem",
          fontSize: "1.2rem",
        }}
      >
        Statistics
      </caption>
      <tbody>
        <tr>
          <td>
            <StatisticLine text={"Good"} />
          </td>
          <td>
            <StatisticLine value={props.good} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text={"Neutral"} />
          </td>
          <td>
            <StatisticLine value={props.neutral} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text={"Bad"} />
          </td>
          <td>
            <StatisticLine value={props.bad} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text={"All"} />
          </td>
          <td>
            <StatisticLine value={props.all.length} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text={"Average"} />
          </td>
          <td>
            <StatisticLine value={props.average} />
          </td>
        </tr>
        <tr>
          <td>
            <StatisticLine text={"Percentage"} />
          </td>
          <td>
            <StatisticLine value={props.percentage} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState([]);

  const [selected, setSelected] = useState(0);

  // save event handlers of each button to its own function
  const handleGood = () => {
    setAll(all.concat("Good"));
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setAll(all.concat("Neutral"));
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setAll(all.concat("Bad"));
    setBad(bad + 1);
  };

  const average = (good - bad) / all.length;
  const percentage = `${(good / all.length) * 100}%`;

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handler={handleGood} text="Good" />
      <Button handler={handleNeutral} text="Neutral" />
      <Button handler={handleBad} text="Bad" />

      <Statistics
        all={all}
        good={good}
        neutral={neutral}
        bad={bad}
        average={average}
        percentage={percentage}
      />
    </div>
  );
};

export default App;
