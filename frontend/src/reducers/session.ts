import { GET_SESSION } from "../actions/types";

const session = (state = [], action: any) => {
  if (action !== undefined) {
    switch (action.type) {
      case GET_SESSION:
        return action.session;
      default:
        return state as any;
    }
  }
  return state as any;
};

export default session;
