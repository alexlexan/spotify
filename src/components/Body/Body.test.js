import React from "react";
import Body from "./Body";
import BodyHome from "./BodyHome";
import BodyPlaylists from "./BodyPlaylists";
import BodySongs from "./BodySongs";
import Search from "../Search/Search";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "../../store/rootReducer";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router-dom";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
// import { Provider } from "react-redux";

describe("test", () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
  });

  it("should render BodyHome 1", () => {
    wrapper = shallow(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Body />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render BodyHome ", () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Body />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(BodyHome)).toHaveLength(1);
    expect(wrapper.find(Search)).toHaveLength(0);
    expect(wrapper.find(BodyPlaylists)).toHaveLength(0);
    expect(wrapper.find(BodySongs)).toHaveLength(0);
  });

  it("should render BodySongs ", () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/playlists/:id/:type"]}>
          <Body />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(BodyHome)).toHaveLength(0);
    expect(wrapper.find(Search)).toHaveLength(0);
    expect(wrapper.find(BodyPlaylists)).toHaveLength(0);
    expect(wrapper.find(BodySongs)).toHaveLength(1);
  });

  it("should render Search ", () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/search"]}>
          <Body />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(BodyHome)).toHaveLength(0);
    expect(wrapper.find(Search)).toHaveLength(1);
    expect(wrapper.find(BodyPlaylists)).toHaveLength(0);
    expect(wrapper.find(BodySongs)).toHaveLength(0);
  });

  it("should render BodyPlaylists ", () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/myplaylists"]}>
          <Body />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(BodyHome).length).toBe(0);
    expect(wrapper.find(Search).length).toBe(0);
    expect(wrapper.find(BodyPlaylists).length).toBe(1);
    expect(wrapper.find(BodySongs).length).toBe(0);
  });
});
