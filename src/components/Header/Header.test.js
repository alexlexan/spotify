import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { shallow } from "enzyme";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("test Header component", () => {
  let component, user, history;
  const mockGoForward = jest.fn();
  const mockGoBack = jest.fn();
  user = {
    display_name: "user",
    images: [{ url: "imagesUrl" }],
  };

  history = {
    location: {
      key: "history",
    },
    goBack: mockGoBack,
    goForward: mockGoForward,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("render Header with user", () => {
    useSelector.mockImplementation((selector) =>
      selector({ spotify: { user } })
    );
    component = shallow(<Header />);
    expect(component).toMatchSnapshot();
  });

  it("render Header without user", () => {
    useSelector.mockImplementation((selector) =>
      selector({ spotify: { user: null } })
    );
    component = shallow(<Header />);
    expect(component).toMatchSnapshot();
  });

  it("should be call mockGoBack and mockGoForward", () => {
    useSelector.mockImplementation((selector) =>
      selector({ spotify: { user } })
    );
    useHistory.mockReturnValue(history);
    component = shallow(<Header />);
    expect(component).toMatchSnapshot();

    component.find(ArrowBackIosIcon).simulate("click");
    expect(mockGoBack).toBeCalledTimes(1);

    component.find(ArrowForwardIosIcon).simulate("click");
    expect(mockGoForward).toBeCalledTimes(1);
  });

  it("should dont call mockGoBack", () => {
    useSelector.mockImplementation((selector) =>
      selector({ spotify: { user } })
    );
    useHistory.mockReturnValue({
      location: { key: null },
      goBack: mockGoBack,
      goForward: mockGoForward,
    });
    component = shallow(<Header />);
    expect(component).toMatchSnapshot();

    component.find(ArrowBackIosIcon).simulate("click");
    expect(mockGoBack).toBeCalledTimes(0);
  });
});
