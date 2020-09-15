import { User, PlaylistsType, ActivePlaylist, Track, State } from "./reducer";
import { ThunkDispatch } from "redux-thunk";

export function setToken(token: string) {
  return {
    type: "SET_TOKEN",
    token,
  } as const;
}

export function setUser(user: User) {
  return {
    type: "SET_USER",
    user,
  } as const;
}

export function setPlaying() {
  return {
    type: "SET_PLAYING",
    playing: false,
  } as const;
}

export function setPlaylists(myPlaylists: PlaylistsType) {
  return {
    type: "SET_PLAYLISTS",
    myPlaylists,
  } as const;
}

export function setActivePlaylist(activePlaylist: ActivePlaylist) {
  return {
    type: "SET_ACTIVE_PLAYLIST",
    activePlaylist,
  } as const;
}

export const play = () => {
  return {
    type: "PLAY",
  } as const;
};

export const stop = () => {
  return {
    type: "STOP",
  } as const;
};

export const pause = () => {
  return {
    type: "PAUSE",
  } as const;
};

export const setSongs = (songs: Track[] | null) => {
  return {
    type: "SET_SONGS",
    songs,
  } as const;
};

export const setVolume = (volume: number) => {
  return {
    type: "VOLUME",
    volume,
  } as const;
};

export const setTrack = (activeTrack: Track) => {
  return {
    type: "SET_TRACK",
    activeTrack,
  } as const;
};

export const playAndSetTrack = (track: Track) => {
  return (dispatch: ThunkDispatch<State, unknown, Actions>) => {
    dispatch(setTrack(track));
    dispatch(play());
  };
};

const actions = {
  setSongs,
  pause,
  stop,
  play,
  setActivePlaylist,
  setPlaylists,
  setPlaying,
  setToken,
  setUser,
  setVolume,
  setTrack,
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type Actions = ReturnType<InferValueTypes<typeof actions>>;
