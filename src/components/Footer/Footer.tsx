import React, { ChangeEvent, useRef } from "react";
import "./Footer.sass";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import { Grid, Slider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Sound from "react-sound";
import { play, pause, playAndSetTrack, stop } from "../../store/actions";
import { AppState } from "../../store/rootReducer";
import { State, Track } from "../../store/reducer";
import { Actions } from "../../store/actions";
import { ThunkDispatch } from "redux-thunk";

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
        {playing === Sound.status.PLAYING ? (
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
        <VolumeSlider
          activeTrack={activeTrack}
          dispatch={dispatch}
          playing={playing}
        />
      </div>
    </div>
  );
};

export default Footer;

type VolumeSliderProps = {
  activeTrack: Track | null;
  dispatch: ThunkDispatch<State, unknown, Actions>;
  playing: string;
};

const VolumeSlider: React.FC<VolumeSliderProps> = ({
  activeTrack,
  dispatch,
  playing,
}) => {
  const volume = useSelector((state: AppState) => state.spotify.volume);
  const oldVolume = useRef(volume);

  const finish = () => {
    dispatch(stop());
  };

  const handleSliderChange = (
    _: ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    dispatch({ type: "VOLUME", volume: newValue as number });
    oldVolume.current = newValue as number;
  };

  const muteVolume = (volume: number, oldVolume: number | number[]) => {
    const newVolume = volume === 0 ? oldVolume : 0;
    dispatch({ type: "VOLUME", volume: newVolume as number });
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <VolumeDownIcon onClick={() => muteVolume(volume, oldVolume.current)} />
      </Grid>
      <Grid item xs>
        {activeTrack && (
          <Sound
            url={activeTrack.preview_url || activeTrack.external_urls.spotify}
            playStatus={playing}
            volume={volume}
            onFinishedPlaying={finish}
          />
        )}
        <Slider
          aria-labelledby="continuous-slider"
          value={volume}
          onChange={handleSliderChange}
        />
      </Grid>
    </Grid>
  );
};
