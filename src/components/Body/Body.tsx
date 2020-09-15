import React from "react";
import "./Body.sass";
import Search from "../Search/Search";
import { Switch, Route } from "react-router-dom";
import BodySongs from "./BodySongs";
import BodyPlaylists from "./BodyPlaylists";
import BodyHome from "./BodyHome";

const Body = () => {
  return (
    <div className="body">
      <Switch>
        <Route exact path="/" component={() => <BodyHome />} />
        <Route exact path="/search" component={() => <Search />} />
        <Route exact path="/myplaylists" component={() => <BodyPlaylists />} />
        <Route
          exact
          path="/playlists/:id/:type"
          component={() => <BodySongs />}
        />
      </Switch>
    </div>
  );
};

export default Body;
