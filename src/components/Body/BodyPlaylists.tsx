import React from "react";
import Header from "../Header/Header";
import Playlists from "./Playlists/Playlists";
import { useSelector } from "react-redux";
import { AppState } from "../../store/rootReducer";
import { PlaylistsType } from "../../store/ducks/type";

const BodyPlaylists: React.FC = () => {
  const playlists = useSelector((state: AppState) => state.player.myPlaylists);

  return (
    <>
      <Header />
      <Playlists playlists={playlists as PlaylistsType} title={`Playlists`} />
    </>
  );
};

export default BodyPlaylists;
