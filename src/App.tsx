import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login/Login";
import { getTokenFromResponse } from "./components/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player/Player";
import { setToken, setUser, setPlaylists } from "./store/actions";
import { AppState } from "./store/rootReducer";

const s = new SpotifyWebApi();

const App = () => {
  const token = useSelector((state: AppState) => state.spotify.token);
  const dispatch = useDispatch();

  useEffect(() => {
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
