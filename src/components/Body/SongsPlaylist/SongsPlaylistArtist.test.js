import React from "react";
import SongsPlaylistArtist from "./SongsPlaylistArtist";
import { SongRows } from "./SongsPlaylistArtist";
import useFetch from "../../../useHooks/useFetch";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
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

describe("test SongsPlaylistArtist component", () => {
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
    tracks: [{ name: "firstTrack" }],
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
  });

  afterEach(() => {
    mockDispatch.mockClear();
  });

  it("should render SongsPlaylistArtist component", () => {
    useFetch.mockReturnValue({
      status: "success",
      value: [playlist, songs],
      error: null,
    });

    component = mount(<SongsPlaylistArtist />);
    expect(component).toMatchSnapshot();
  });

  it("should render Error component if status error", () => {
    useFetch.mockReturnValue({
      status: "error",
      value: null,
      error: "error",
    });

    component = shallow(<SongsPlaylistArtist />);
    expect(component).toMatchSnapshot();
  });

  it("should render Loader component if status pending", () => {
    useFetch.mockReturnValue({
      status: "pending",
      value: null,
      error: null,
    });

    component = shallow(<SongsPlaylistArtist />);
    expect(component).toMatchSnapshot();
  });

  it("should click in PlayCircleFilledIcon", () => {
    useFetch.mockReturnValue({
      status: "success",
      value: [playlist, songs],
      error: null,
    });

    component = shallow(<SongsPlaylistArtist />);
    component.find(PlayCircleFilledIcon).simulate("click");
    expect(mockDispatch).toBeCalledTimes(1);
  });

  it("should dispatch in useEffect if we have playlist and songs", () => {
    useFetch.mockReturnValue({
      status: "success",
      value: [playlist, songs],
      error: null,
    });

    mockUseEffect();

    component = shallow(<SongsPlaylistArtist />);
    expect(mockDispatch).toBeCalledTimes(2);
  });

  it("should dispatch in useEffect if we dont have playlist and songs", () => {
    useFetch.mockReturnValue({
      status: "pending",
      value: null,
      error: null,
    });

    mockUseEffect();

    component = shallow(<SongsPlaylistArtist />);
    expect(mockDispatch).toBeCalledTimes(0);
  });
});

describe("test SongRows component", () => {
  const songs = {
    items: [{ name: "firstTrack" }],
  };
  const image = "urlImage";
  it("should render SongRows component with props", () => {
    const component = shallow(<SongRows songs={songs} image={image} />);
    expect(component).toMatchSnapshot();
  });
});
