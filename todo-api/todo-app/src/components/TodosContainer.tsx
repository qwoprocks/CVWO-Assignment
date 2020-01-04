import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";
import LogoutButton from "./LogoutButton";
import { styled } from "@material-ui/core/styles";
import { useDialog } from "muibox";
import EditBox from "./EditBox";
import Chip from "@material-ui/core/Chip";

interface Todo {
  id: number;
  title: string;
  tags: string[];
  done: boolean;
}

const StyledCheckbox = styled(Checkbox)({
  padding: 0,
  float: "left",
  appearance: "none",
  outline: "none",
  borderRadius: "10%",
});

const StyledChip = styled(Chip)({
  marginLeft: '2px',
  marginTop: '2px',
});

const TodosContainer = () => {
  const dialog = useDialog();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toggleRefresh, setRefresh] = useState(false);
  const [editBoxOpen, setEditBoxOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo>({
    id: 0,
    title: "",
    tags: [],
    done: false
  });
  const refreshTodos = () => setRefresh(!toggleRefresh);

  const createTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let element = e.currentTarget as HTMLInputElement;
      let value = element.value;
      axios
        .post("/api/v1/todos", { todo: { title: value } })
        .then(response => {
          setTodos(todos.concat(response.data));
          element.value = "";
          refreshTodos();
        })
        .catch(error =>
          dialog.alert("Error, unable to create Todo.\n" + error)
        );
    }
  };

  const deleteTodo = (id: number) => {
    dialog
      .confirm("Are you sure you want to delete this Todo?")
      .then(() => {
        axios
          .delete(`/api/v1/todos/${id}`)
          .then(response => {
            refreshTodos();
          })
          .catch(error =>
            dialog.alert("Error, unable to delete Todo.\n" + error)
          );
      })
      .catch(() => {});
  };

  const logout = () => {
    axios
      .delete("/api/v1/session/0")
      .then(response => {
        window.location.reload();
      })
      .catch(err => dialog.alert("Error, unable to logout.\n" + err));
  };

  const openEditBox = (id: number, value: string, tags: string[]) => {
    setEditTodo({ id: id, title: value, tags: tags, done: false });
    setEditBoxOpen(true);
  };

  const handleEditBoxSave = (title: string, tags: string[]) => {
    setEditBoxOpen(false);
    axios
      .put(`/api/v1/todos/${editTodo.id}`, {
        todo: { title: title, tags: tags }
      })
      .then(response => {
        console.log(response);
        refreshTodos();
      })
      .catch(err => dialog.alert("Error, unable to update Todo\n" + err));
  };

  const handleEditBoxCancel = (hasNotChanged: boolean) => {
    if (hasNotChanged) {
      setEditBoxOpen(false);
    } else {
      dialog
        .confirm("Are you sure you want to cancel without saving?")
        .then(() => setEditBoxOpen(false))
        .catch(() => {});
    }
  };

  useEffect(() => {
    axios
      .get(`/api/v1/todos`)
      .then(response => {
        if (response.data !== null) {
          setTodos(response.data);
        }
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
              <table style={{ width: "100%" }}>
                <tr>
                  <th>
                    <StyledCheckbox />
                  </th>
                  <th style={{ textAlign: "left", fontWeight: "normal", width: "70%"}} >
                    <span>
                      <label className="taskLable">{todo.title}</label>
                      <div style={{ fontSize: "0.85em", marginTop: "5px", color: "gray", padding: "0"}}>
                        <span >Tags:&nbsp;</span>
                        {todo.tags.length === 0 ? 
                          "-" : 
                          todo.tags.map(tag => {
                            return <StyledChip clickable label={tag} variant="outlined" />;
                          })
                        }
                      </div>
                    </span>
                  </th>
                  <th>
                    <span
                      className="editTaskBtn"
                      onClick={() =>
                        openEditBox(todo.id, todo.title, todo.tags)
                      }
                    >
                      <EditIcon />
                    </span>
                  </th>
                  <th>
                    <span
                      className="deleteTaskBtn"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <DeleteIcon />
                    </span>
                  </th>
                </tr>
              </table>
            </li>
          );
        })}
      </ul>
      <EditBox
        id={editTodo.id}
        defaultTitle={editTodo.title}
        defaultTags={editTodo.tags}
        open={editBoxOpen}
        save={(s: string, t: string[]) => handleEditBoxSave(s, t)}
        cancel={(nc: boolean) => handleEditBoxCancel(nc)}
      />
    </div>
  );
};

export default TodosContainer;
