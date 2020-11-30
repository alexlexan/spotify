import { combineReducers } from "redux";
import authReducer from "./ducks/auth";
import playerReducer from "./ducks/player";

export const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer
});

export type AppState = ReturnType<typeof rootReducer>;
