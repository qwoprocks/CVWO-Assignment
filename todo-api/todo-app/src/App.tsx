import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import "./App.css";
import TodosContainer from "./components/TodosContainer";
import LoginForm from "./components/LoginForm";

const App: React.FC = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get("/api/v1/session", { withCredentials: true })
            .then(res => {
                setUser(res.data.user);
                //console.log(user);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Todo List</h1>
                </header>
                <Switch>
                    <Route path="/login">
                        <LoginForm />
                    </Route>
                    <Route path="/todos">
                        {user == null ? (
                            <Redirect to="/login" />
                        ) : (
                            <TodosContainer />
                        )}
                    </Route>
                    <Route path="/">
                        {user == null ? (
                            <Redirect to="/login" />
                        ) : (
                            <Redirect to="/todos" />
                        )}
                    </Route>
                    <Route path="/signup" />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
