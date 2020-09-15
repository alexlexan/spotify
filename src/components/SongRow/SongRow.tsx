import React from "react";
import "./SongRow.sass";
import { useDispatch } from "react-redux";
import { playAndSetTrack } from "../../store/actions";
import { Track } from "../../store/reducer";

export type SongRowProps = {
  track: Track;
  image?: string;
};

const SongRow: React.FC<SongRowProps> = ({ track, image }) => {
  const dispatch = useDispatch();

  return (
    <div className="songRow" onClick={() => dispatch(playAndSetTrack(track))}>
      <img
        className="songRow__album"
        src={track.album ? track.album.images[0].url : image}
        alt=""
      />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>
          {track.artists?.map((artist) => artist.name).join(", ")} -{" "}
          {track.album?.name}
        </p>
      </div>
    </div>
  );
};

export default React.memo(SongRow);
