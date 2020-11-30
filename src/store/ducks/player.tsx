import { PlaylistsType, ActivePlaylist, Track } from "./type";
import { ThunkDispatch } from "redux-thunk";

export const SET_PLAYING   = 'spotify/auth/SET_PLAYING';
export const SET_PLAYLISTS   = 'spotify/auth/SET_PLAYLISTS';
export const SET_ACTIVE_PLAYLIST   = 'spotify/auth/SET_ACTIVE_PLAYLIST';
export const SET_SONGS   = 'spotify/auth/SET_SONGS';
export const SET_TRACK   = 'spotify/auth/SET_TRACK';
export const PLAY   = 'spotify/auth/PLAY';
export const STOP   = 'spotify/auth/STOP';
export const VOLUME   = 'spotify/auth/VOLUME';
export const PAUSE   = 'spotify/auth/PAUSE';

export function setPlaying() {
  return {
    type: SET_PLAYING,
    playing: false,
  } as const;
}

export function setPlaylists(myPlaylists: PlaylistsType) {
  return {
    type: SET_PLAYLISTS,
    myPlaylists,
  } as const;
}

export function setActivePlaylist(activePlaylist: ActivePlaylist) {
  return {
    type: SET_ACTIVE_PLAYLIST,
    activePlaylist,
  } as const;
}

export const play = () => {
  return {
    type: PLAY,
  } as const;
};

export const stop = () => {
  return {
    type: STOP,
  } as const;
};

export const pause = () => {
  return {
    type: PAUSE,
  } as const;
};

export const setSongs = (songs: Track[] | null) => {
  return {
    type: SET_SONGS,
    songs,
  } as const;
};

export const setVolume = (volume: number) => {
  return {
    type: VOLUME,
    volume,
  } as const;
};

export const setTrack = (activeTrack: Track) => {
  return {
    type: SET_TRACK,
    activeTrack,
  } as const;
};

export const playAndSetTrack = (track: Track) => {
  return (dispatch: ThunkDispatch<playerState, unknown, playerActions>) => {
    dispatch(setTrack(track));
    dispatch(play());
  };
};

export const actionsPlayer = {
  setSongs,
  pause,
  stop,
  play,
  setActivePlaylist,
  setPlaylists,
  setPlaying,
  setVolume,
  setTrack,
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type playerActions = ReturnType<InferValueTypes<typeof actionsPlayer>>;

export type playerState = {
  myPlaylists: PlaylistsType | null;
  playing: "PLAYING" | "STOPPED" | "PAUSED";
  activeTrack: Track | null;
  volume: number;
  songs: Track[] | null;
  activePlaylist: ActivePlaylist | null;
}

export const initialState: playerState = {
  myPlaylists: null,
  playing: "PAUSED",
  activeTrack: null,
  volume: 50,
  songs: null,
  activePlaylist: null,
};

const playerReducer = (
  state: playerState = initialState,
  action: playerActions
): playerState => {
  switch (action.type) {
    case PLAY:
      return {
        ...state,
        playing: "PLAYING",
      };
    case STOP:
      return {
        ...state,
        playing: "STOPPED",
      };
    case PAUSE:
      return {
        ...state,
        playing: "PAUSED",
      };

    case VOLUME:
      return {
        ...state,
        volume: action.volume,
      };

    case SET_TRACK:
      return {
        ...state,
        activeTrack: action.activeTrack,
      };
    case SET_SONGS:
      return {
        ...state,
        songs: action.songs,
      };
    case SET_ACTIVE_PLAYLIST:
      return {
        ...state,
        activePlaylist: action.activePlaylist,
      };
    case SET_PLAYLISTS:
      return {
        ...state,
        myPlaylists: action.myPlaylists,
      };
    default:
      return state;
  }
};

export default playerReducer;