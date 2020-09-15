import React from "react";
import ErrorIcon from "@material-ui/icons/Error";

type Props = {
  error: Error;
};

const Error: React.FC<Props> = ({ error }) => {
  return (
    <div className="Error">
      <ErrorIcon /> {error}
    </div>
  );
};

export default Error;
