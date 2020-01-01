import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";
import LogoutButton from "./LogoutButton";
import { useDialog } from 'muibox'

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

const TodosContainer = () => {
  const dialog = useDialog();
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
        .catch(error => dialog.alert("Error, unable to create Todo.\n" + error));
    }
  };

  const deleteTodo = (id: number) => {
    axios
      .delete(`/api/v1/todos/${id}`)
      .then(response => {
        refresh();
      })
      .catch(error => dialog.alert("Error, unable to delete Todo.\n" + error));
  };

  const logout = () => {
    axios
      .delete("/api/v1/session/0")
      .then(response => {
        window.location.reload();
      })
      .catch(err => dialog.alert("Error, unable to logout.\n" + err));
  };

  useEffect(() => {
    axios
      .get("/api/v1/todos")
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => dialog.alert("Error, unable to fetch Todos.\n" + err));
  }, [dialog, toggleRefresh]);

  return (
    <div className="container">
      <LogoutButton onClick={logout} />
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
              <span className="editTaskBtn" onClick={() => {}}>
                <EditIcon />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodosContainer;
