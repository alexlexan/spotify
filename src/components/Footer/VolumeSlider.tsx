import React, { ChangeEvent } from "react";
import "./Footer.sass";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { Grid, Slider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Sound from "react-sound";
import { stop } from "../../store/actions";
import { AppState } from "../../store/rootReducer";
import { State, Track } from "../../store/reducer";
import { Actions } from "../../store/actions";
import { ThunkDispatch } from "redux-thunk";

type VolumeSliderProps = {
  activeTrack: Track | null;
  playing: "PLAYING" | "STOPPED" | "PAUSED";
};

const VolumeSlider: React.FC<VolumeSliderProps> = ({
  activeTrack,
  playing,
}) => {
  const dispatch: ThunkDispatch<State, unknown, Actions> = useDispatch();
  const volume = useSelector((state: AppState) => state.spotify.volume);
  const oldVolume = React.useRef(volume);

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

export default VolumeSlider;
