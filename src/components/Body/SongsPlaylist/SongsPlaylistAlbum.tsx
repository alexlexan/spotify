import React, { memo } from "react";
import SongRow from "../../SongRow/SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import "../Body.sass";
import { useSelector, useDispatch } from "react-redux";
import {
  playAndSetTrack,
  setSongs,
  setActivePlaylist,
} from "../../../store/actions";
import Loader from "../../Loader";
import useFetch from "../../../useHooks/useFetch";
import { getPlaylists } from "../../../useHooks/useFetch";
import Error from "../../Error";
import { playlistUrl } from "../../spotify";
import { useParams } from "react-router-dom";
import { AppState } from "../../../store/rootReducer";
import { Songs, ActivePlaylist, SongsAlbum } from "../../../store/reducer";

const SongsPlaylistAlbum: React.FC = () => {
  let playlist: ActivePlaylist | null = null;
  let songs: SongsAlbum | null = null;

  const token = useSelector((state: AppState) => state.spotify.token);
  const { type, id } = useParams<{ type: string; id: string }>();
  const dispatch = useDispatch();

  const urlPlaylist = `${playlistUrl}/${type}s/${id}`;
  const urlSongs = `${urlPlaylist}/tracks`;

  const { status, value, error } = useFetch<ActivePlaylist, SongsAlbum>(
    getPlaylists,
    token,
    urlPlaylist,
    urlSongs
  );

  if (status === "success") {
    [playlist, songs] = value;
  }

  React.useEffect(() => {
    playlist && dispatch(setActivePlaylist(playlist));
    songs && dispatch(setSongs(songs.items));
  }, [songs, playlist, dispatch]);

  if (status === "error") {
    return <Error error={error as Error} />;
  }

  return (
    <>
      {status === "success" ? (
        <>
          <div className="body__info">
            <img src={playlist?.images[0].url} alt={`${playlist?.name}`} />
            <div className="body__infoText">
              <strong>PLAYLIST</strong>
              <h2>{playlist?.name}</h2>
              <p>{playlist?.total} songs</p>
            </div>
          </div>

          <div className="body__songs">
            <div className="body__icons">
              <PlayCircleFilledIcon
                className="body__shuffle"
                onClick={() => dispatch(playAndSetTrack(songs!?.items[0]))}
              />
              <FavoriteIcon fontSize="large" />
              <MoreHorizIcon />
            </div>
            {songs && (
              <SongRows
                songs={songs as Songs}
                image={playlist!?.images[0].url}
              />
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

type PropsSongs = {
  songs: SongsAlbum;
  image: string;
};

export const SongRows: React.FC<PropsSongs> = memo(({ songs, image }) => {
  return (
    <>
      {songs.items?.map((item, index) => (
        <SongRow key={index} track={item} image={image} />
      ))}
    </>
  );
});

export default memo(SongsPlaylistAlbum);
