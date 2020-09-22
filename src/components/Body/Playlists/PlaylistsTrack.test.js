import React from "react";
import PlaylistsTrack from "./PlaylistsTrack";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...require.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("tests PlaylistsTrack component with props", () => {
  const firstTrack = {
    album: {
      images: [{ url: "firstTrackUrl" }],
    },
    name: "firstTrack",
  };
  const secondTrack = {
    name: "secondTrack",
    album: {
      images: [{ url: "secondTrackUrl" }],
    },
  };
  const playlists = {
    items: [firstTrack, secondTrack],
  };

  afterEach(() => {
    mockDispatch.mockClear();
  });

  it("should render PlaylistsTrack with props", () => {
    const component = shallow(
      <PlaylistsTrack playlists={playlists} title={"test"} />
    );
    expect(component).toMatchSnapshot();
  });

  it("if click item should call dispatch 2 times", () => {
    const component = shallow(
      <PlaylistsTrack playlists={playlists} title={"test"} />
    );
    component
      .find(".playlist__item")
      .first()
      .simulate("click", playlists.items[0]);
    expect(mockDispatch).toBeCalledTimes(2);
  });
});

describe("tests PlaylistsTrack component without props", () => {
  it("should render PlaylistsTrack without props", () => {
    const component = shallow(<PlaylistsTrack />);
    expect(component).toMatchSnapshot();
  });
});
