import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  FETCH_TODOS,
  FETCH_TAGS
} from "../actions/types";

const initialState = {
  todos: [],
  tags: [],
  response: []
};

const todos = (state = initialState, action: any) => {
  if (action !== undefined) {
    switch (action.type) {
      case ADD_TODO:
        return {
          ...state,
          response: action.response
        };
      case UPDATE_TODO:
        return {
          ...state,
          response: action.response
        };
      case DELETE_TODO:
        return {
          ...state,
          response: action.response
        };
      case FETCH_TODOS:
        return {
          ...state,
          todos: action.todos
        };
      case FETCH_TAGS:
        return {
          ...state,
          tags: action.tags
        };
      default:
        return state as any;
    }
  }
  return state as any;
};

export default todos;
