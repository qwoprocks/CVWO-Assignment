import React from "react";
import "./App.css";
import TodosContainer from "./components/TodosContainer";
import LoginForm from "./components/LoginForm";

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Todo List</h1>
            </header>
            <LoginForm />
        </div>
    );
};

export default App;
