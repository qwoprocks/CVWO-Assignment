import {
  GET_SESSION,
  SESSION_LOGIN,
  SESSION_SIGNUP,
  SESSION_LOGOUT,
  SessionActionTypes
} from "../actions/types";

import { Session } from "./types";

const session = (
  state = [],
  action: {
    type: SessionActionTypes;
    session: Session;
  }
) => {
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
        return state;
    }
  }
  return state;
};

export default session;
