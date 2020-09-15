import React from "react";
import Login from "./Login.tsx";

test("shows out of cheese error message", () => {
  const component = mount(<Login />);
  expect(component).toMatchSnapshot();
});
