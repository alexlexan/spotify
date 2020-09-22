import React from "react";
import Playlists from "./Playlists";

describe("tests Playlists component", () => {
  it("should render Playlists without props", () => {
    const component = shallow(<Playlists />);
    expect(component).toMatchSnapshot();
  });
  it("should render Playlists with props", () => {
    const firstTrack = {
      id: 1,
      name: "firstTrack",
      type: "Track",
      images: [{ url: "firstTrackUrl" }],
    };
    const secondTrack = {
      id: 1,
      name: "secondTrack",
      type: "Track",
      images: [{ url: "secondTrack" }],
    };
    const playlists = {
      items: [firstTrack, secondTrack],
    };
    const component = shallow(
      <Playlists playlists={playlists} title={"test"} />
    );
    expect(component).toMatchSnapshot();
  });
});
