import React from "react";
import "./SidebarOption.sass";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActivePlaylist } from "../../store/actions";

function SidebarOption({ option = "test", Icon, id, playlist }) {
  const dispatch = useDispatch();
  const getPlaylists = (item) => {
    dispatch(setActivePlaylist(item));
  };

  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h4>{option}</h4>
      ) : (
        <NavLink
          to={`/playlists/${id}/sidebarPlaylist`}
          activeClassName="sidebarOptionActive"
          onClick={() => getPlaylists(playlist)}
        >
          <p>{option}</p>
        </NavLink>
      )}
    </div>
  );
}

export default SidebarOption;
