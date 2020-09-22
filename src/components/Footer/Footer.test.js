import React from "react";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import Sound from "react-sound";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe("test Footer component", () => {
  let component, songs, firstTrack, secondTrack, thirdTrack;
  firstTrack = {
    id: 1,
    name: "firstTrack",
    type: "Track",
    images: [{ url: "firstTrackUrl" }],
    artists: [{ name: "Artist" }],
  };
  secondTrack = {
    id: 2,
    name: "secondTrack",
    type: "Track",
    images: [{ url: "secondTrackUrl" }],
    artists: [{ name: "Artist" }],
  };
  thirdTrack = {
    id: 3,
    name: "thirdTrack",
    type: "Track",
    images: [{ url: "thirdTrack" }],
    artists: [{ name: "Artist" }],
    album: { images: [{ url: "urlalbumPlaylist" }] },
  };

  afterEach(() => {
    mockDispatch.mockClear();
  });
  describe("render Footer component without activeTrack, without playing", () => {
    songs = [firstTrack, secondTrack];

    beforeEach(() => {
      useSelector
        .mockReturnValueOnce(Sound.status.STOPPED)
        .mockReturnValueOnce({
          images: [{ url: "urlPlaylist" }],
          name: "playlist",
        })
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(songs);
      component = shallow(<Footer />);
    });

    it("snapshot Footer component without activeTrack, without playing", () => {
      expect(component).toMatchSnapshot();
    });

    it("test click SkipPreviousIcon component should dispatch pause action", () => {
      component.find(SkipPreviousIcon).simulate("click");
      expect(mockDispatch).toBeCalledTimes(0);
    });

    it("test click SkipNextIcon component should dispatch pause action", () => {
      component.find(SkipNextIcon).simulate("click");
      expect(mockDispatch).toBeCalledTimes(0);
    });
  });

  describe("test", () => {
    songs = [firstTrack, secondTrack, thirdTrack];
    it("snapshot Footer component with activeTrack with activeTrack.album, without playing", () => {
      useSelector.mockImplementation((selector) =>
        selector({
          spotify: {
            playing: Sound.status.STOPPED,
            activePlaylist: {
              images: [{ url: "urlPlaylist" }],
              name: "playlist",
            },
            activeTrack: thirdTrack,
            songs: songs,
          },
        })
      );
      component = shallow(<Footer />);
      expect(component).toMatchSnapshot();
    });
  });

  describe("render Footer component with activeTrack, without playing", () => {
    songs = [firstTrack, secondTrack, thirdTrack];

    beforeEach(() => {
      useSelector
        .mockReturnValueOnce(Sound.status.STOPPED)
        .mockReturnValueOnce({
          images: [{ url: "urlPlaylist" }],
          name: "playlist",
        })
        .mockReturnValueOnce(firstTrack)
        .mockReturnValueOnce(songs);
    });

    it("snapshot Footer component with activeTrack, without playing", () => {
      component = shallow(<Footer />);
      expect(component).toMatchSnapshot();
    });

    it("test click PlayCircleOutlineIcon component should dispatch play action", () => {
      component = shallow(<Footer />);
      component.find(PlayCircleOutlineIcon).simulate("click");
      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch.mock.calls[0]).toEqual([
        {
          type: "PLAY",
        },
      ]);
    });
  });

  describe("render Footer component with activeTrack, with playing", () => {
    songs = [firstTrack, secondTrack, thirdTrack];

    beforeEach(() => {
      useSelector
        .mockReturnValueOnce(Sound.status.PLAYING)
        .mockReturnValueOnce({
          images: [{ url: "urlPlaylist" }],
          name: "playlist",
        })
        .mockReturnValueOnce(secondTrack)
        .mockReturnValueOnce(songs);
      component = shallow(<Footer />);
    });

    it("snapshot Footer component", () => {
      expect(component).toMatchSnapshot();
    });

    it("test click PauseCircleOutlineIcon component should dispatch pause action", () => {
      component.find(PauseCircleOutlineIcon).simulate("click");
      expect(mockDispatch).toBeCalledTimes(1);
      expect(mockDispatch.mock.calls[0]).toEqual([
        {
          type: "PAUSE",
        },
      ]);
    });

    it("test click SkipPreviousIcon component should dispatch pause action", () => {
      component.find(SkipPreviousIcon).simulate("click");
      expect(mockDispatch).toBeCalledTimes(1);
    });

    it("test click SkipNextIcon component should dispatch pause action", () => {
      component.find(SkipNextIcon).simulate("click");
      expect(mockDispatch).toBeCalledTimes(1);
    });
  });
});
