import React from "react";
import Player from "./Player.tsx";

describe("tests Player component", () => {
  it("render Player component", () => {
    const component = shallow(<Player />);
    expect(component).toMatchSnapshot();
  });
});
