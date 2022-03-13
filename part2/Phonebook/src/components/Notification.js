import { React, useEffect } from "react";

function Notification({ message, color, show, setShow }) {
  const style = {
    margin: "10px 0",
    color,
    backgroundColor: "aliceblue",
    border: `1px solid ${color}`,
    padding: "4px",
  };
  useEffect(() => {
    setTimeout(() => {
      setShow(!show);
    }, 2000);
  }, []);

  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  );
}
export default Notification;
