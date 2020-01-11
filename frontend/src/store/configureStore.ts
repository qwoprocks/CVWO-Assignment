import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from 'redux-thunk';

const configureStore = (initialState: any) => {
  const store = createStore(
    rootReducer,
    initialState(),
    applyMiddleware(thunk)
  );

  return store;
};

export default configureStore;
