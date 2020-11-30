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
