import { ADD_TODO, DELETE_TODO, FETCH_TODOS } from "../actions/types";

const todos = (state = [], action: any) => {
  if (action !== undefined) {
    switch (action.type) {
      case ADD_TODO:
        return [...state, action.payload] as any[];
      case DELETE_TODO:
        return state.filter(
          (todos: any) => todos.id !== action.payload.id
        ) as any;
      case FETCH_TODOS:
        return action.todos as any;
      default:
        return state as any;
    }
  }
  return state as any;
};

export default todos;
