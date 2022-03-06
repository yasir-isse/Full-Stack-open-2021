import React from "react";
import FormField from "./FormField";
function Form({ handleSubmit, newName, newNum, handleName, handleNum }) {
  return (
    <form onSubmit={handleSubmit}>
      <FormField
        fieldName={"Name"}
        fieldValue={newName}
        fieldHandle={handleName}
      />
      <FormField
        fieldName={"Number"}
        fieldValue={newNum}
        fieldHandle={handleNum}
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default Form;
