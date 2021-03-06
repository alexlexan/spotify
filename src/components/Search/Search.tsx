import React, { useState, useEffect } from "react";
import "../Header/Header.sass";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import useAsync from "../../useHooks/useAsync";
import Loader from "../Loader";
import Playlists from "../Body/Playlists/Playlists";
import Error from "../Error";
import useDebounce from "../../useHooks/useDebounce";
import { search } from "../../useHooks/useSearch";
import PlaylistsTrack from "../Body/Playlists/PlaylistsTrack";
import { AppState } from "../../store/rootReducer";
import { PlaylistsType } from "../../store/ducks/type";
import { Status } from "../../useHooks/useAsync";

const Search: React.FC = () => {
  const history = useHistory();
  const user = useSelector((state: AppState) => state.auth.user);
  const token = useSelector((state: AppState) => state.auth.token);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [
    featuredPlaylists,
    setFeaturedPlaylists,
  ] = useState<PlaylistsType | null>(null);

  const [resultsSearch, setResultsSearch] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const { status, value: categories, error } = useAsync<
    featuredPlaylists,
    Error,
    getCategoriesSearch
  >(getCategories, token);

  const urlSearch = `https://api.spotify.com/v1/search?q=${debouncedSearchTerm}&limit=10&type=album,track,artist`;

  const Back = () => {
    if (history.location.key) {
      history.goBack();
    }
  };

  const Forward = () => {
    history.goForward();
  };

  useEffect(() => {
    let isMounted = true;
    categories && setFeaturedPlaylists(categories.playlists);
    if (debouncedSearchTerm) {
      setIsSearching(true);
      search(token, urlSearch).then((results) => {
        isMounted && setResultsSearch(results);
        setIsSearching(false);
      });
    } else {
      setResultsSearch(null);
    }
    return () => {
      isMounted = false;
    };
  }, [categories, debouncedSearchTerm, history, token, urlSearch]);

  if (status === "error") {
    return <Error error={error as Error} />;
  }

  return (
    <>
      <div className="header">
        <div className="header__left">
          <ArrowBackIosIcon
            className="header__arrowLeft"
            onClick={() => Back()}
          />
          <ArrowForwardIosIcon
            className="header__arrowRight"
            onClick={() => Forward()}
          />
          <div className="header__search">
            <SearchIcon />
            <input
              placeholder="Search for Artists, Songs, or Podcasts "
              type="text"
              onChange={(event) => setSearchTerm(event.target.value)}
              value={searchTerm}
            />
          </div>
        </div>
        {user && (
          <div className="header__right">
            <Avatar
              alt={user.display_name}
              src={(user.images as SpotifyApi.ImageObject[])[0]?.url}
            />
            <h4>{user.display_name}</h4>
          </div>
        )}
      </div>

      <SearchPlaylist
        status={status}
        isSearching={isSearching}
        resultsSearch={resultsSearch}
        featuredPlaylists={featuredPlaylists}
      />
    </>
  );
};

export default Search;

type PropsSearchPlaylist = {
  resultsSearch: any;
  featuredPlaylists: PlaylistsType | null;
  status: Status;
  isSearching: boolean;
};

const SearchPlaylist: React.FC<PropsSearchPlaylist> = ({
  resultsSearch,
  featuredPlaylists,
  status,
  isSearching,
}) => {
  if (resultsSearch && isSearching) {
    return <Loader />;
  }
  if (resultsSearch && !isSearching) {
    return (
      <>
        <Playlists playlists={resultsSearch.albums} title={`Albums`} />
        <Playlists playlists={resultsSearch.artists} title={`Artists`} />
        <PlaylistsTrack playlists={resultsSearch.tracks} title={`Tracks`} />
      </>
    );
  }
  if (status === "success") {
    return (
      <Playlists playlists={featuredPlaylists} title={`Featured playlists`} />
    );
  }
  return <Loader />;
};

type featuredPlaylists = {
  playlists: PlaylistsType;
};

type getCategoriesSearch = typeof getCategories;

async function getCategories<featuredPlaylists>(
  token: string
): Promise<featuredPlaylists> {
  const getData = async (url: string, token: string) => {
    const request = new Request(url, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    });

    const responce = await fetch(request);
    const result = await responce.json();
    return result;
  };

  const categories = await getData(
    "https://api.spotify.com/v1/browse/featured-playlists?country=RU&limit=10",
    token
  );
  return categories;
}
