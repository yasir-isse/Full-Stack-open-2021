import { useState } from "react";

const DisplayAnecdote = ({ anecdotes, selected }) => (
  <h2>{anecdotes[selected]}</h2>
);

const DisplayVotes = ({ vote, selected }) => {
  return <p>has {vote[selected]} votes</p>;
};

const DisplayMostVotes = ({ anecdotes, vote }) => {
  let largest = 0;
  let index = 0;
  for (let i = 0; i < vote.length; i++) {
    if (vote[i] > largest) {
      largest = vote[i];
      index = i;
    }
  }
  return (
    <div>
      <h3>Anecdote with most votes: </h3>
      <p>{anecdotes[index]}</p>
      <p>has {largest} votes!</p>
    </div>
  );
};

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));

  const handleChange = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVote = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
  };

  return (
    <div>
      <DisplayAnecdote anecdotes={anecdotes} selected={selected} />
      <DisplayVotes vote={vote} selected={selected} />
      <Button text={"Vote"} handler={handleVote} />
      <Button text={"Next Anecdote"} handler={handleChange} />
      <DisplayMostVotes anecdotes={anecdotes} vote={vote} />
    </div>
  );
};

export default App;
