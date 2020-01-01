import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { DialogProvider } from "muibox";
import "./App.css";
import TodosContainer from "./components/TodosContainer";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const App: React.FC = () => {
    const [user, setUser] = useState(0);
    const loggedin = () => {
        return typeof user !== "undefined" && user !== 0;
    };

    useEffect(() => {
        axios
            .get("/api/v1/session", { withCredentials: true })
            .then(res => {
                setUser(res.data.user);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <DialogProvider>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <h1>Todo List</h1>
                    </header>
                    {/*user === 0 ? (
                    <Switch>
                        <Route path="/login">
                            <LoginForm />
                        </Route>
                        <Route path="/signup">
                            <SignupForm />
                        </Route>
                        <Route path="/">
                            <Redirect to="/login" />
                        </Route>
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/todos">
                            <TodosContainer />
                        </Route>
                        <Route path="/">
                            <Redirect to="/todos" />
                        </Route>
                    </Switch>
                )*/}

                    <Switch>
                        <Route path="/login">
                            {loggedin() ? (
                                <Redirect to="/todos" />
                            ) : (
                                <LoginForm />
                            )}
                        </Route>
                        <Route path="/signup">
                            {loggedin() ? (
                                <Redirect to="/todos" />
                            ) : (
                                <SignupForm />
                            )}
                        </Route>
                        <Route path="/todos">
                            {loggedin() ? (
                                <TodosContainer />
                            ) : (
                                <Redirect to="/login" />
                            )}
                        </Route>
                        <Route path="/">
                            {user === 0 ? (
                                <Redirect to="/todos" />
                            ) : (
                                <Redirect to="/login" />
                            )}
                        </Route>
                    </Switch>
                </div>
            </Router>
        </DialogProvider>
    );
};

export default App;
