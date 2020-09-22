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
import useFetch from "../../../useHooks/useFetch";
import { getPlaylists } from "../../../useHooks/useFetch";
import Loader from "../../Loader";
import Error from "../../Error";
import { useParams } from "react-router-dom";
import { playlistUrl } from "../../spotify";
import { ActivePlaylist, SongsArtist } from "../../../store/reducer";
import { AppState } from "../../../store/rootReducer";

const SongsPlaylistArtist = () => {
  let playlist: ActivePlaylist | null = null;
  let songs: SongsArtist | null = null;
  const { type, id } = useParams<{ type: string; id: string }>();
  const dispatch = useDispatch();
  const token = useSelector((state: AppState) => state.spotify.token);

  const urlPlaylist = `${playlistUrl}/${type}s/${id}`;
  const urlSongs = `${playlistUrl}/${type}s/${id}/top-tracks?country=RU`;

  const { status, value, error } = useFetch<ActivePlaylist, SongsArtist>(
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
    songs && dispatch(setSongs(songs.tracks));
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
                onClick={() => dispatch(playAndSetTrack(songs!?.tracks[0]))}
              />
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

export const SongRows: React.FC<{ songs: SongsArtist }> = memo(({ songs }) => {
  return (
    <>
      {songs.tracks?.map((item, index) => (
        <SongRow key={index} track={item} />
      ))}
    </>
  );
});

export default React.memo(SongsPlaylistArtist);
