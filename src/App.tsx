import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login/Login";
import { getTokenFromResponse } from "./components/spotify";
import s from "./spotifyApp";
import Player from "./components/Player/Player";
import { setToken, setUser } from "./store/ducks/auth";
import {setPlaylists } from "./store/ducks/player";
import { AppState } from "./store/rootReducer";

const App = () => {
  const token = useSelector((state: AppState) => state.auth.token);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      dispatch(setToken(_token));

      s.setAccessToken(_token);

      s.getMe().then((user) => {
        dispatch(setUser(user));
      });

      s.getUserPlaylists().then((playlists) => {
        dispatch(setPlaylists(playlists));
      });
    }
  }, [dispatch]);

  return <div className="App">{token ? <Player /> : <Login />}</div>;
};

export default App;
