import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { DialogProvider } from "muibox";
import configureStore from "./store/configureStore";
import rootReducer from './reducers';

const store = configureStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <DialogProvider>
            <App />
        </DialogProvider>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
