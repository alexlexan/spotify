import React from "react";
import Header from "../Header/Header";
import Playlists from "./Playlists/Playlists";
import { useSelector } from "react-redux";
import { AppState } from "../../store/rootReducer";
import { PlaylistsType } from "../../store/reducer";

const BodyPlaylists: React.FC = () => {
  const playlists = useSelector((state: AppState) => state.spotify.myPlaylists);

  return (
    <>
      <Header />
      <Playlists playlists={playlists as PlaylistsType} title={`Playlists`} />
    </>
  );
};

export default BodyPlaylists;
