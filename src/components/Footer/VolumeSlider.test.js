import React from "react";
import { useSelector } from "react-redux";
import VolumeSlider from "./VolumeSlider";
import Sound from "react-sound";
import { Slider } from "@material-ui/core";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe("test VolumeSlier component", () => {
  let component, useRef;
  let activeTrack = { preview_url: "activeTrackUrl" };
  const playing = "PLAYING";

  beforeEach(() => {
    useSelector.mockImplementation((selector) =>
      selector({ spotify: { volume: 50 } })
    );
    useRef = jest.spyOn(React, "useRef");
  });

  afterEach(() => {
    mockDispatch.mockClear();
  });

  it("should render component without props", () => {
    component = shallow(<VolumeSlider />);
    expect(component).toMatchSnapshot();
  });

  it("should render component with props", () => {
    component = shallow(
      <VolumeSlider activeTrack={activeTrack} playing={playing} />
    );
    expect(component).toMatchSnapshot();
  });
  it("in Sound component should dispatch action Stop and test props ", () => {
    let wrapper = shallow(
      <VolumeSlider activeTrack={activeTrack} playing={"PLAYING"} />
    );
    let propsSound = wrapper.find(Sound).props();
    propsSound.onFinishedPlaying();
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch.mock.calls[0]).toEqual([
      {
        type: "STOP",
      },
    ]);
    expect(propsSound.playStatus).toBe(playing);
    expect(propsSound.volume).toBe(50);
    expect(propsSound.url).toBe(activeTrack.preview_url);
  });

  it("in Sound component url spotify ", () => {
    activeTrack = { external_urls: { spotify: "url" } };
    let wrapper = shallow(
      <VolumeSlider activeTrack={activeTrack} playing={"PLAYING"} />
    );
    let propsSound = wrapper.find(Sound).props();
    expect(propsSound.url).toBe("url");
  });

  it("should dispatch Volume action", () => {
    let wrapper = shallow(
      <VolumeSlider activeTrack={activeTrack} playing={"PLAYING"} />
    );
    let volume = 60;
    wrapper.find(Slider).simulate("change", {}, volume);
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch.mock.calls[0]).toEqual([
      { type: "VOLUME", volume: 60 },
    ]);
  });

  it("should dispatch mute action", () => {
    let wrapper = shallow(
      <VolumeSlider activeTrack={activeTrack} playing={"PLAYING"} />
    );
    let vol = 60;
    let oldVolume = 50;
    wrapper.find(VolumeDownIcon).simulate("click", vol, oldVolume);
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch.mock.calls[0]).toEqual([{ type: "VOLUME", volume: 0 }]);
  });

  it("should dispatch mute action 1", () => {
    useSelector.mockImplementation((selector) =>
      selector({ spotify: { volume: 0 } })
    );
    useRef.mockReturnValue({ current: 20 });
    let wrapper = shallow(
      <VolumeSlider activeTrack={activeTrack} playing={"PLAYING"} />
    );

    wrapper.find(VolumeDownIcon).simulate("click");
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch.mock.calls[0]).toEqual([
      { type: "VOLUME", volume: 20 },
    ]);
  });
});
