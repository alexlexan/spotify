import React from "react";
import SongsPlaylistTracks from "./SongsPlaylistTracks";
import { SongRows } from "./SongsPlaylistTracks";
import useFetch from "../../../useHooks/useFetch";
jest.mock("../../../useHooks/useFetch");

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...require.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: (selector) => selector({ spotify: { token: "string" } }),
}));

jest.mock("react-router-dom", () => ({
  useParams: () => ({
    type: "artist",
    id: "123",
  }),
}));

describe("test SongsPlaylistTracks component", () => {
  let component, useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  const playlist = {
    name: "playlist",
    total: 10,
    images: [{ url: "secondTrackUrl" }],
  };
  const songs = {
    items: [{ track: [{ name: "firstTrack" }, { name: "secondTrack" }] }],
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
  });

  afterEach(() => {
    mockDispatch.mockClear();
  });

  it("should render SongsPlaylistTracks component", () => {
    useFetch.mockReturnValue({
      status: "success",
      value: [playlist, songs],
      error: null,
    });

    component = mount(<SongsPlaylistTracks />);
    expect(component).toMatchSnapshot();
  });

  it("should render Error component if status error", () => {
    useFetch.mockReturnValue({
      status: "error",
      value: null,
      error: "error",
    });

    component = shallow(<SongsPlaylistTracks />);
    expect(component).toMatchSnapshot();
  });

  it("should render Loader component if status pending", () => {
    useFetch.mockReturnValue({
      status: "pending",
      value: null,
      error: null,
    });

    component = shallow(<SongsPlaylistTracks />);
    expect(component).toMatchSnapshot();
  });

  it("should dispatch in useEffect if we have playlist and songs", () => {
    useFetch.mockReturnValue({
      status: "success",
      value: [playlist, songs],
      error: null,
    });

    mockUseEffect();

    component = shallow(<SongsPlaylistTracks />);
    expect(mockDispatch).toBeCalledTimes(2);
  });

  it("should dispatch in useEffect if we dont have playlist and songs", () => {
    useFetch.mockReturnValue({
      status: "pending",
      value: null,
      error: null,
    });

    mockUseEffect();

    component = shallow(<SongsPlaylistTracks />);
    expect(mockDispatch).toBeCalledTimes(0);
  });
});

describe("test SongRows component", () => {
  const songs = [{ name: "firstTrack" }, { name: "secondTrack" }];
  const image = "urlImage";
  it("should render SongRows component with props", () => {
    const component = shallow(<SongRows songs={songs} image={image} />);
    expect(component).toMatchSnapshot();
  });
});
