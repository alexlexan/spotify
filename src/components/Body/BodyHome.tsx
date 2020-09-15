import React from "react";
import Header from "../Header/Header";
import Playlists from "./Playlists/Playlists";
import PlaylistsTrack from "./Playlists/PlaylistsTrack";
import { useSelector } from "react-redux";
import useAsync from "../../useHooks/useAsync";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Body";
import Error from "../Error";
import { AppState } from "../../store/rootReducer";
import {
  PlaylistsTrackType,
  PlaylistsType,
  PlaylistsNewReleasesType,
} from "../../store/reducer";

const BodyHome = () => {
  const token = useSelector((state: AppState) => state.spotify.token);
  const { status, value, error } = useAsync<
    [PlaylistsType, PlaylistsTrackType, PlaylistsNewReleasesType],
    Error,
    getHomePlaylistsType
  >(getHomePlaylists, token);

  if (status === "error") {
    return <Error error={error} />;
  }

  return (
    <>
      <Header />
      {value && status === "success" ? (
        <>
          <Playlists playlists={value[0]} title={`Top Artists`} />
          <Playlists playlists={value[2]?.albums} title={`New Releases`} />
          <PlaylistsTrack playlists={value[1]} title={`Top Tracks`} />
        </>
      ) : (
        <div className="loader">
          <CircularProgress color="inherit" />
        </div>
      )}
    </>
  );
};

export default BodyHome;

async function getHomePlaylists<
  PlaylistsType,
  PlaylistsTrackType,
  PlaylistsNewReleasesType
>(
  token: string
): Promise<[PlaylistsType, PlaylistsTrackType, PlaylistsNewReleasesType]> {
  const getData = async (url: string, token: string) => {
    const request = new Request(url, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    });

    const responce = await fetch(request);
    const result = await responce.json();
    return result;
  };

  const topArtists = await getData(
    `https://api.spotify.com/v1/me/top/artists?limit=5`,
    token
  );
  const topTracks = await getData(
    `https://api.spotify.com/v1/me/top/tracks?limit=10`,
    token
  );
  const newRealeses = await getData(
    `https://api.spotify.com/v1/browse/new-releases?country=SE&limit=5`,
    token
  );
  return Promise.all([topArtists, topTracks, newRealeses]);
}

type getHomePlaylistsType = typeof getHomePlaylists;
