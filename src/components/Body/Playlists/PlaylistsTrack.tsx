import React from "react";
import "./Playlist.sass";
import { useDispatch } from "react-redux";
import { playAndSetTrack, setSongs } from "../../../store/actions";
import { PlaylistsTrackType, Track } from "../../../store/reducer";

type Props = {
  playlists: PlaylistsTrackType;
  title: string;
};

const PlaylistsTrack: React.FC<Props> = ({ playlists, title }) => {
  const dispatch = useDispatch();
  const play = (track: Track) => {
    dispatch(playAndSetTrack(track));
    dispatch(setSongs(null));
  };

  if (!playlists?.items.length) {
    return null;
  }

  return (
    <div className="playlist">
      <h1>{title}</h1>
      <div className="grid">
        {playlists?.items.map((item, index) => (
          <div
            className="grid__item playlist__item"
            key={index}
            onClick={() => play(item)}
          >
            <img src={item.album.images[0]?.url} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistsTrack;
