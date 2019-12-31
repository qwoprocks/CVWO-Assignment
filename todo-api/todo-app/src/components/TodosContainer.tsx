import React, { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

function TodosContainer() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toggleRefresh, setRefresh] = useState(false);
  const refresh = () => setRefresh(!toggleRefresh);

  const createTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let element = e.currentTarget as HTMLInputElement;
      let value = element.value;
      axios
        .post("/api/v1/todos", { todo: { title: value } })
        .then(response => {
          setTodos(todos.concat(response.data));
          element.value = "";
          refresh();
        })
        .catch(error => console.log(error));
    }
  };

  const deleteTodo = (id : number) => {
    axios.delete(`/api/v1/todos/${id}`)
    .then(response => {
      refresh();
    })
    .catch(error => console.log(error))
  };

  useEffect(() => {
    axios
      .get("/api/v1/todos")
      .then(res => {
        setTodos(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, [toggleRefresh]);

  return (
    <div>
      <div className="inputContainer">
        <input
          className="taskInput"
          type="text"
          placeholder="Add a task"
          maxLength={50}
          onKeyPress={createTodo}
        />
      </div>
      <div className="listWrapper">
        <ul className="taskList">
          {todos.map(todo => {
            return (
              <li className="task" value={todo.title} key={todo.id}>
                <input className="taskCheckbox" type="checkbox" />
                <label className="taskLable">{todo.title}</label>
                <span 
                  className="deleteTaskBtn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  x
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TodosContainer;
