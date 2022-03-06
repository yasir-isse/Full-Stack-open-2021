import React from "react";

function FormField({ fieldName, fieldValue, fieldHandle }) {
  return (
    <div>
      {fieldName}: <input value={fieldValue} onChange={fieldHandle} />
    </div>
  );
}

export default FormField;
