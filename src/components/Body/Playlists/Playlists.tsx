import React from "react";
import "./Playlist.sass";
import { Link } from "react-router-dom";
import { PlaylistsType } from "../../../store/reducer";

type Props = {
  playlists: PlaylistsType | null;
  title: string;
};

const Playlists: React.FC<Props> = ({ playlists, title }) => {
  if (!playlists?.items.length) {
    return null;
  }

  return (
    <div className="playlist">
      <h1>{title}</h1>
      <div className="grid">
        {playlists?.items.map((item, index) => (
          <Link to={`/playlists/${item.id}/${item.type}`} key={index}>
            <div className="grid__item playlist__item">
              <img src={item.images[0]?.url} alt={item.name} />
              <p>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Playlists);
