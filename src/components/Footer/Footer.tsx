import React from "react";
import "./Footer.sass";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { play, pause, playAndSetTrack } from "../../store/actions";
import { AppState } from "../../store/rootReducer";
import { Track } from "../../store/reducer";
import VolumeSlider from "./VolumeSlider";

const Footer: React.FC = () => {
  const playing = useSelector((state: AppState) => state.spotify.playing);
  const playlists = useSelector(
    (state: AppState) => state.spotify.activePlaylist
  );
  const activeTrack = useSelector(
    (state: AppState) => state.spotify.activeTrack
  );
  const songs = useSelector((state: AppState) => state.spotify.songs);
  const dispatch = useDispatch();

  const nextTrack = (songs: Track[] | null) => {
    if (songs && activeTrack) {
      const nextItem = songs.findIndex((item) => activeTrack.id === item.id);
      songs[nextItem + 1] && dispatch(playAndSetTrack(songs[nextItem + 1]));
    }
  };

  const prevTrack = (songs: Track[] | null) => {
    if (songs && activeTrack) {
      const nextItem = songs.findIndex((item) => activeTrack.id === item.id);
      songs[nextItem - 1] && dispatch(playAndSetTrack(songs[nextItem - 1]));
    }
  };

  const pauseTrack = () => {
    activeTrack && dispatch(pause());
  };
  const playTrack = () => {
    activeTrack && dispatch(play());
  };

  return (
    <div className="footer">
      <div className="footer__left">
        {activeTrack && (
          <img
            className="footer__albumLogo"
            src={activeTrack?.album?.images[0].url || playlists?.images[0].url}
            alt={`${activeTrack?.name}`}
          />
        )}
        {activeTrack ? (
          <div className="footer__songInfo">
            <h4>{activeTrack.name}</h4>
            <p>{activeTrack.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <SkipPreviousIcon
          className="footer__icon"
          onClick={() => prevTrack(songs)}
        />
        {playing === "PLAYING" ? (
          <PauseCircleOutlineIcon
            onClick={pauseTrack}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            fontSize="large"
            className="footer__icon"
            onClick={playTrack}
          />
        )}
        <SkipNextIcon
          className="footer__icon"
          onClick={() => nextTrack(songs)}
        />
      </div>
      <div className="footer__right">
        <VolumeSlider activeTrack={activeTrack} playing={playing} />
      </div>
    </div>
  );
};

export default Footer;
