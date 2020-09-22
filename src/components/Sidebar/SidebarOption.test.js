import React from "react";
import SidebarOption from "./SidebarOption.tsx";
import HomeIcon from "@material-ui/icons/Home";

test("render SidebarOptionOption component", () => {
  const component = shallow(<SidebarOption Icon={HomeIcon} />);
  expect(component).toMatchSnapshot();
});
