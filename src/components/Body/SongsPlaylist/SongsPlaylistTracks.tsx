import React, { memo } from "react";
import SongRow from "../../SongRow/SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import "../Body.sass";
import { useSelector, useDispatch } from "react-redux";
import { setSongs, setActivePlaylist } from "../../../store/ducks/player";
import Loader from "../../Loader";
import Error from "../../Error";
import { useParams } from "react-router-dom";
import { playlistUrl } from "../../spotify";
import useFetch, { getPlaylists } from "../../../useHooks/useFetch";
import { AppState } from "../../../store/rootReducer";
import { SongsTrack, ActivePlaylist, Track } from "../../../store/ducks/type";

const SongsPlaylistTracks = () => {
  let playlist: ActivePlaylist | null = null;
  let songs: Track[] | null = null;
  const token = useSelector((state: AppState) => state.auth.token);
  const { type, id } = useParams<{ type: string; id: string }>();
  const dispatch = useDispatch();

  const urlPlaylist = `${playlistUrl}/${type}s/${id}`;
  const urlSongs = `${urlPlaylist}/tracks`;

  const { status, value, error } = useFetch<ActivePlaylist, SongsTrack>(
    getPlaylists,
    token,
    urlPlaylist,
    urlSongs
  );

  if (status === "success") {
    playlist = value[0];
    let songsArray = value[1];
    songs = songsArray?.items.map((item) => item.track);
  }
  React.useEffect(() => {
    playlist && dispatch(setActivePlaylist(playlist));
    songs && dispatch(setSongs(songs));
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
              <PlayCircleFilledIcon className="body__shuffle" />
              <FavoriteIcon fontSize="large" />
              <MoreHorizIcon />
            </div>
            {songs && <SongRows songs={songs} />}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export const SongRows = memo(({ songs }: { songs: Track[] }) => {
  return (
    <>
      {songs?.map((item, index) => (
        <SongRow key={index} track={item} />
      ))}
    </>
  );
});

export default SongsPlaylistTracks;
