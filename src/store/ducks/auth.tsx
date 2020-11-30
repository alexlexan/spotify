import {User} from './type'

const SET_TOKEN   = 'spotify/auth/SET_TOKEN';
const SET_USER = 'spotify/auth/SET_USER';

export function setToken(token: string) {
  return {
    type: SET_TOKEN,
    token,
  } as const;
}

export function setUser(user: User) {
  return {
    type: SET_USER,
    user,
  } as const;
}

export const actions = {
  setToken,
  setUser,
};

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type authActions = ReturnType<InferValueTypes<typeof actions>>;

export const initialState: authState = {
  user: null,
  token: "",
};


export type authState = {
  user: User | null;
  token: string;
}

const authReducer = (
  state: authState = initialState,
  action: authActions
): authState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};

export default authReducer;