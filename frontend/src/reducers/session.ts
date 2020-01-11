import {
  GET_SESSION,
  SESSION_LOGIN,
  SESSION_SIGNUP,
  SESSION_LOGOUT
} from "../actions/types";

const session = (state = [], action: any) => {
  if (action !== undefined) {
    switch (action.type) {
      case GET_SESSION:
        return action.session;
      case SESSION_LOGIN:
        return action.session;
      case SESSION_SIGNUP:
        return action.session;
      case SESSION_LOGOUT:
        return action.session;
      default:
        return state as any;
    }
  }
  return state as any;
};

export default session;
