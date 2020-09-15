import React from "react";
import Footer from "../Footer/Footer";
import "./Player.sass";
import Sidebar from "../Sidebar/Sidebar";
import Body from "../Body/Body";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../ErrorFallback";

const Player: React.FC = () => {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Body />
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
};

export default Player;
