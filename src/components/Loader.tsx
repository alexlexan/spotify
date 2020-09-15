import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Loader.sass";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <CircularProgress color="inherit" />
    </div>
  );
};

export default Loader;
