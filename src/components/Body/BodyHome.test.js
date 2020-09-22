import React from "react";
import BodyHome from "./BodyHome";
import { getHomePlaylists } from "./BodyHome";
import useAsync from "../../useHooks/useAsync";

jest.mock("../../useHooks/useAsync");

jest.mock("react-redux", () => ({
  useSelector: (selector) => selector({ spotify: { token: "string" } }),
}));

describe("test BodyHome component", () => {
  let component;

  it("should render Playlists and PlaylistsTrack components if we have success status", () => {
    useAsync.mockReturnValue({
      status: "success",
      value: ["PlaylistsType", "PlaylistsTrackType", { albums: "albums" }],
      error: null,
    });

    component = shallow(<BodyHome />);
    expect(component).toMatchSnapshot();
  });
  it("should render Loader component if we have pending status", () => {
    useAsync.mockReturnValue({
      status: "pending",
      value: ["PlaylistsType", "PlaylistsTrackType", { albums: "albums" }],
      error: null,
    });

    component = shallow(<BodyHome />);
    expect(component).toMatchSnapshot();
  });
  it("should render Error component if we have error status", () => {
    useAsync.mockReturnValue({
      status: "error",
      value: null,
      error: "error",
    });

    component = shallow(<BodyHome />);
    expect(component).toMatchSnapshot();
  });
});

describe("getHomePlaylists function test", () => {
  let fetch;
  beforeEach(() => {
    fetch = jest.spyOn(window, "fetch");
  });
  afterEach(() => {
    fetch.mockClear();
  });

  it("should return corret result", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => "topArtists",
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => "topTracks",
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => "newRealeses",
      });
    const result = await getHomePlaylists("token");
    expect(result).toEqual(["topArtists", "topTracks", "newRealeses"]);
    expect(fetch).toHaveBeenCalledTimes(3);
  });
});
