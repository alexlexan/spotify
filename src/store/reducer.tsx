import { Actions } from "./actions";

export const initialState: State = {
  user: null,
  myPlaylists: null,
  playing: "PAUSED",
  activeTrack: null,
  volume: 50,
  songs: null,
  activePlaylist: null,
  token: "",
  // token:
  //   "BQDhLR_AAI3lfGszRE8lr2YV_AC3L6Tuf6EgdLRKCRg4mUA9xs_Lb8tzVBPyKOnEJ1rtfY65CD9TajtGh_7N4UNEeAb_-kWugvqr0gWmFzVl86JuL_-sPrEAUGmY9wVXtL5oUxUIhaYUJlB_ODHn8yAAlITZz0ee0_Hi7TPTJnN6Ons5",
};

const spotifyReducer = (
  state: State = initialState,
  action: Actions
): State => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "PLAY":
      return {
        ...state,
        playing: "PLAYING",
      };
    case "STOP":
      return {
        ...state,
        playing: "STOPPED",
      };
    case "PAUSE":
      return {
        ...state,
        playing: "PAUSED",
      };

    case "VOLUME":
      return {
        ...state,
        volume: action.volume,
      };

    case "SET_TRACK":
      return {
        ...state,
        activeTrack: action.activeTrack,
      };
    case "SET_SONGS":
      return {
        ...state,
        songs: action.songs,
      };
    case "SET_ACTIVE_PLAYLIST":
      return {
        ...state,
        activePlaylist: action.activePlaylist,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    // case "SET_SPOTIFY":
    //   return {
    //     ...state,
    //     spotify: action.spotify,
    //   };

    case "SET_PLAYLISTS":
      return {
        ...state,
        myPlaylists: action.myPlaylists,
      };
    default:
      return state;
  }
};

export default spotifyReducer;

export interface User extends SpotifyApi.CurrentUsersProfileResponse {}

export type PlaylistsItem = {
  href: string;
  id: string;
  images: Images[];
  name: string;
  type: string;
  uri: string;
  tracks: {
    href: string;
    total: number;
  };
};

export type PlaylistsNewReleasesType = {
  albums: PlaylistsType;
};

export interface PlaylistsType
  extends SpotifyApi.ListOfUsersPlaylistsResponse {}

export type PlaylistsTrackType = {
  href: string;
  items: Track[];
  limit: number;
  total: number;
};

type Artist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type Track = {
  album: {
    images: Images[];
    name: string;
  };
  artists: Artist[];
  external_urls: {
    spotify: string;
  };
  name: string;
  preview_url: string;
  id: string;
  href: string;
  type: string;
  uri: string;
};

type Images = {
  height: number;
  weight: number;
  url: string;
};

export type ActivePlaylist = {
  href: string;
  id: string;
  images: Images[];
  name: string;
  type: string;
  uri: string;
  total: number;
};

export type State = {
  user: User | null;
  myPlaylists: PlaylistsType | null;
  playing: "PLAYING" | "STOPPED" | "PAUSED";
  activeTrack: Track | null;
  volume: number;
  songs: Track[] | null;
  activePlaylist: ActivePlaylist | null;
  token: string;
};

export type Songs = {
  items: Track[];
  tracks: Track[];
};

export type SongsAlbum = {
  items: Track[];
};
export type SongsArtist = {
  tracks: Track[];
};
export type SongsTrack = {
  items: SongsTrackItem[];
};

export type SongsTrackItem = {
  track: Track;
};
