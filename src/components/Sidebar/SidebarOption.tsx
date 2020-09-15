import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import React from "react";
import "./SidebarOption.sass";

type Props = {
  option: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
};

const SidebarOption: React.FC<Props> = ({ option = "test", Icon }) => {
  return (
    <div className="sidebarOption">
      <Icon className="sidebarOption__icon" />
      <h4>{option}</h4>
    </div>
  );
};

export default SidebarOption;
