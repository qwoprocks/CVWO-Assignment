import React, { useState, useEffect } from "react";
import {
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import "./App.css";
import { useDialog } from "muibox";
import TodosContainer from "./components/TodosContainer";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { connect } from "react-redux";
import { getSession } from "./actions/index";

type Props = {
    dispatch: any;
    session: {
        user: number;
        logged_in: boolean;
    };
};

const App: React.FC<Props> = props => {
    const { dispatch, session } = props;

    const dialog = useDialog();
    const [loggedIn, setLoggedIn] = useState(false);
    const [doneLoading, setDoneLoading] = useState(false);

    useEffect(() => {
        dispatch(getSession()).then(() => {
            setDoneLoading(true);
        }).catch((err: string) => {
            dialog.alert("Error, unable to get user.\n" + err);
        });
    }, [dispatch]);

    useEffect(() => {
        setLoggedIn(session.logged_in);
    }, [session]);

    return doneLoading ? (
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
                            {loggedIn ? (
                                <Redirect to="/todos" />
                            ) : (
                                <LoginForm />
                            )}
                        </Route>
                        <Route path="/signup">
                            {loggedIn ? (
                                <Redirect to="/todos" />
                            ) : (
                                <SignupForm />
                            )}
                        </Route>
                        <Route path="/todos">
                            {loggedIn ? (
                                <TodosContainer />
                            ) : (
                                <Redirect to="/login" />
                            )}
                        </Route>
                        <Route path="/">
                            {loggedIn ? (
                                <Redirect to="/todos" />
                            ) : (
                                <Redirect to="/login" />
                            )}
                        </Route>
                    </Switch>
                </div>
            </Router>
    ) : (
        <></>
    );
};

const mapStateToProps = (state: any) => {
    return {
        session: state.session
    };
};

export default connect(mapStateToProps)(App);
