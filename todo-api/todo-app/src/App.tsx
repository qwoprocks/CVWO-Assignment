import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TodosContainer from "./components/TodosContainer";

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Todo List</h1>
            </header>
            <TodosContainer />
        </div>
    );
};

export default App;
