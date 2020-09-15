import React from "react";

type Props = {
  error?: Error;
};

const ErrorFallback: React.FC<Props> = ({ error }) => {
  if (error) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }
  return null;
};

export default ErrorFallback;
