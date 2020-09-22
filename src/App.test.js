import React from "react";
import App from "./App";
import Login from "./components/Login/Login";
import Player from "./components/Player/Player";
import { useSelector } from "react-redux";
import { getTokenFromResponse } from "./components/spotify";
import s from "./spotifyApp";

jest.mock("./spotifyApp");

jest.mock("./components/spotify", () => ({
  getTokenFromResponse: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...require.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe("tests App component", () => {
  let component, useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
  });

  afterEach(() => {
    mockDispatch.mockClear();
  });

  describe("render components in <App />", () => {
    it("should render App component", () => {
      component = shallow(<App />);
      const wrapper = component.find(".App");
      expect(wrapper.length).toBe(1);
    });

    it("should render player if we have token", () => {
      useSelector.mockImplementation((selector) =>
        selector({ spotify: { token: "string" } })
      );
      component = shallow(<App />);
      expect(component.find(Player).length).toBe(1);
    });

    it("should render Login if we dont have token", () => {
      useSelector.mockImplementation((selector) =>
        selector({ spotify: { token: "" } })
      );
      component = shallow(<App />);
      expect(component.find(Login)).toHaveLength(1);
    });
  });

  describe("dispatch in App", () => {
    it("should dispatch 3 times and equal args in dispatch", () => {
      useSelector.mockImplementation((selector) =>
        selector({ spotify: { token: "string" } })
      );
      getTokenFromResponse.mockReturnValueOnce({
        access_token: "token",
      });
      mockUseEffect();
      s.getMe.mockImplementation(() => Promise.resolve(mockDispatch("user")));
      s.getUserPlaylists.mockImplementation(() =>
        Promise.resolve(mockDispatch("playlist"))
      );
      component = shallow(<App />);
      expect(mockDispatch).toBeCalledTimes(3);
      expect(mockDispatch.mock.calls[0]).toEqual([
        {
          token: "token",
          type: "SET_TOKEN",
        },
      ]);
      expect(mockDispatch.mock.calls[1]).toEqual(["user"]); // pass
      expect(mockDispatch.mock.calls[2]).toEqual(["playlist"]); // pass
    });

    it("should no one dispatch if we no have token", () => {
      useSelector.mockImplementation((selector) =>
        selector({ spotify: { token: "string" } })
      );
      getTokenFromResponse.mockReturnValueOnce({
        access_token: false,
      });
      mockUseEffect();

      component = shallow(<App />);
      expect(mockDispatch).toBeCalledTimes(0);
    });
  });
});

// describe("<App />", () => {
//   let action, state;
//   beforeEach(() => {
//     state = {
//       user: null,
//       token: null,
//       myPlaylists: { album: 2 },
//     };
//   });

//   it("dispatch setUser", () => {
//     action = setUser("user");
//     let newState = spotifyReducer(state, action);
//     expect(newState.user).toBe("user");
//   });
//   it("dispatch setUser", () => {
//     action = setToken("token");
//     let newState = spotifyReducer(state, action);
//     expect(newState.token).toBe("token");
//   });
//   it("dispatch setUser", () => {
//     action = setPlaylists({ album: 1 });
//     let newState = spotifyReducer(state, action);
//     expect(newState.myPlaylists.album).toBe(1);
//   });
// });
