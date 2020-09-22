import React from "react";
import Sidebar from "./Sidebar.tsx";

test("render Sidebar component", () => {
  const component = shallow(<Sidebar />);
  expect(component).toMatchSnapshot();
});
