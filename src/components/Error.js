import React from "react";
import ErrorIcon from "@material-ui/icons/Error";

function Error({ error }) {
  return (
    <div className="Error">
      <ErrorIcon /> {error}
    </div>
  );
}

export default Error;
