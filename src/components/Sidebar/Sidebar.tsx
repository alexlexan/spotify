import React from "react";
import "./Sidebar.sass";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <NavLink to={`/`} activeClassName="sidebarOptionActive">
        <SidebarOption Icon={HomeIcon} option="Home" />
      </NavLink>

      <NavLink to={`/search`} activeClassName="sidebarOptionActive">
        <SidebarOption Icon={SearchIcon} option="Search" />
      </NavLink>

      <NavLink to={`/myplaylists`} activeClassName="sidebarOptionActive">
        <SidebarOption Icon={LibraryMusicIcon} option="Your Library" />
      </NavLink>
    </div>
  );
};

export default Sidebar;
