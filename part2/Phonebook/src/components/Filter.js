import React from "react";

function Filter({ handler, state }) {
  return (
    <div>
      <p>
        filter shown with
        <input value={state} onChange={handler} />
      </p>
    </div>
  );
}

export default Filter;
