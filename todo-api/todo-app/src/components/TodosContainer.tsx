import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";

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

  const deleteTodo = (id: number) => {
    axios
      .delete(`/api/v1/todos/${id}`)
      .then(response => {
        refresh();
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    axios
      .get("/api/v1/todos")
      .then(res => {
        setTodos(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
    axios
      .get("/api/v1/session", {withCredentials: true})
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err));
  }, [toggleRefresh]);

  return (
    <div className="container">
      <div className="inputContainer">
        <input
          className="taskInput"
          type="text"
          placeholder="Add a task"
          maxLength={50}
          onKeyPress={createTodo}
        />
      </div>
      <ul className="taskList">
        {todos.map(todo => {
          return (
            <li className="task" value={todo.title} key={todo.id}>
              <Checkbox />
              <label className="taskLable">{todo.title}</label>
              <span
                className="deleteTaskBtn"
                onClick={() => deleteTodo(todo.id)}
              >
                <DeleteIcon />
              </span>
              <span 
                className="editTaskBtn"
                onClick={() => {}}
              >
                <EditIcon />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodosContainer;
