import React from "react";

function Notification({ message, color, setShow }) {
  const style = {
    margin: "10px 0",
    color,
    backgroundColor: "aliceblue",
    border: `1px solid ${color}`,
    padding: "4px",
  };

  return (
    <div style={style}>
      <p>{message}</p>
      {setTimeout(() => {
        setShow(false);
      }, 2000)}
    </div>
  );
}
export default Notification;
