import { actions } from "./actions";
import { playAndSetTrack } from "./actions";

describe("test actions", () => {
  let expectedAction;

  it("should return correct result of action setToken ", () => {
    const token = "id token";
    expectedAction = {
      type: "SET_TOKEN",
      token,
    };
    expect(actions.setToken(token)).toEqual(expectedAction);
  });

  it("should return correct result of action setUser ", () => {
    const user = "user";
    expectedAction = {
      type: "SET_USER",
      user,
    };
    expect(actions.setUser(user)).toEqual(expectedAction);
  });

  it("should return correct result of action setPlaying ", () => {
    expectedAction = {
      type: "SET_PLAYING",
      playing: false,
    };
    expect(actions.setPlaying()).toEqual(expectedAction);
  });

  it("should return correct result of action setPlaylists ", () => {
    const myPlaylists = "myPlaylists";
    expectedAction = {
      type: "SET_PLAYLISTS",
      myPlaylists,
    };
    expect(actions.setPlaylists(myPlaylists)).toEqual(expectedAction);
  });

  it("should return correct result of action setActivePlaylist ", () => {
    const activePlaylist = "activePlaylist";
    expectedAction = {
      type: "SET_ACTIVE_PLAYLIST",
      activePlaylist,
    };
    expect(actions.setActivePlaylist(activePlaylist)).toEqual(expectedAction);
  });

  it("should return correct result of action play ", () => {
    expectedAction = {
      type: "PLAY",
    };
    expect(actions.play()).toEqual(expectedAction);
  });

  it("should return correct result of action setSongs ", () => {
    const songs = ["track", "track"];
    expectedAction = {
      type: "SET_SONGS",
      songs,
    };
    expect(actions.setSongs(songs)).toEqual(expectedAction);
  });

  it("should return correct result of action stop ", () => {
    expectedAction = {
      type: "STOP",
    };
    expect(actions.stop()).toEqual(expectedAction);
  });

  it("should return correct result of action pause ", () => {
    expectedAction = {
      type: "PAUSE",
    };
    expect(actions.pause()).toEqual(expectedAction);
  });

  it("should return correct result of action setVolume ", () => {
    expectedAction = {
      type: "VOLUME",
      volume: 50,
    };
    expect(actions.setVolume(50)).toEqual(expectedAction);
  });

  it("should return correct result of action setTrack ", () => {
    const activeTrack = "track";
    expectedAction = {
      type: "SET_TRACK",
      activeTrack,
    };
    expect(actions.setTrack(activeTrack)).toEqual(expectedAction);
  });

  it("should return correct result of action playAndSetTrack ", () => {
    const activeTrack = "track";
    const expected = [{ type: "SET_TRACK", activeTrack }, { type: "PLAY" }];

    const dispatchMock = jest.fn();
    playAndSetTrack(activeTrack)(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(2);
    expect(dispatchMock.mock.calls[0][0]).toEqual(expected[0]);
    expect(dispatchMock.mock.calls[1][0]).toEqual(expected[1]);
  });
});
