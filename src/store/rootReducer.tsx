import { combineReducers } from "redux";
import spotifyReducer from "./reducer";

export const rootReducer = combineReducers({
  spotify: spotifyReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
