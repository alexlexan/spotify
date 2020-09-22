import React from "react";
import "../Header/Header.sass";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { AppState } from "../../store/rootReducer";

const Header = () => {
  const user = useSelector((state: AppState) => state.spotify.user);
  const history = useHistory();

  const Back = () => {
    history.location.key && history.goBack();
  };
  const Forward = () => {
    history.goForward();
  };

  return (
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
  );
};

export default React.memo(Header);
