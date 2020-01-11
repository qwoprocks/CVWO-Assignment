import { combineReducers } from 'redux';
import TodosReducer from './todos';
import SessionReducer from './session';

const rootReducer = combineReducers({
  todos: TodosReducer,
  session: SessionReducer
});

export default rootReducer;