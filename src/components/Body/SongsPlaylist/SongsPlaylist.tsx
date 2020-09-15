import React from "react";
import { useParams } from "react-router-dom";
import SongsPlaylistArtist from "./SongsPlaylistArtist";
import SongsPlaylistAlbum from "./SongsPlaylistAlbum";
import SongsPlaylistTracks from "./SongsPlaylistTracks";

type playlistType = "playlist" | "album" | "artist";

const SongsPlaylist: React.FC = () => {
  const { type }: { type: playlistType } = useParams();
  let songs;

  switch (type) {
    case "playlist":
      songs = <SongsPlaylistTracks />;
      break;
    case "album":
      songs = <SongsPlaylistAlbum />;
      break;
    case "artist":
      songs = <SongsPlaylistArtist />;
      break;
    default:
      songs = <SongsPlaylistArtist />;
  }

  return <>{songs}</>;
};

export default SongsPlaylist;
