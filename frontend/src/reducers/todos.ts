import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  FETCH_TODOS,
  FETCH_TAGS,
  TodoActionTypes
} from "../actions/types";

import { Todo } from "./types";

const initialState = {
  todos: [],
  tags: [],
  response: []
};

const todos = (
  state = initialState,
  action: {
    type: TodoActionTypes;
    response: string;
    todos: Todo[];
    tags: string[];
  }
) => {
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
        return state;
    }
  }
  return state;
};

export default todos;
