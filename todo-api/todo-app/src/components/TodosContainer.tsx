import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";
import LogoutButton from "./LogoutButton";
import { styled } from "@material-ui/core/styles";
import { useDialog } from "muibox";
import EditBox from "./EditBox";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import AddTodoBox from "./AddTodoBox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import SelectAllIcon from "@material-ui/icons/SelectAll";

interface Todo {
  id: number;
  title: string;
  tags: string[];
  done: boolean;
}

const StyledTaskList = styled(List)({
  width: "100%"
});

const StyledTaskItem = styled(ListItem)({
  width: "100%",
  verticalAlign: "middle",
  fontSize: "1.2em",
  padding: "10px 20px",
  margin: "5px 0",
  backgroundColor: "white",
  borderRadius: "5px",
  "&:hover": {
    cursor: "default",
    backgroundColor: "white"
  }
});

const StyledListItemText = styled(ListItemText)({
  flex: "none",
  width: "72%"
});

const StyledCheckbox = styled(Checkbox)({
  padding: 0,
  float: "left",
  appearance: "none",
  outline: "none",
  borderRadius: "10%"
});

const StyledChip = styled(Chip)({
  marginLeft: "2px",
  marginTop: "2px"
});

const StyledAddIcon = styled(AddIcon)({
  position: "absolute",
  right: "10%",
  top: "25%",
  borderRadius: "2px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#DDDDDD"
  }
});

const TodosContainer = () => {
  const dialog = useDialog();
  const searchBar: any = useRef(null);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([]);
  const [toggleRefresh, setRefresh] = useState(false);
  const [editBoxOpen, setEditBoxOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo>({
    id: 0,
    title: "",
    tags: [],
    done: false
  });
  const [addTodoBoxOpen, setAddTodoBoxOpen] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  const refreshTodos = () => setRefresh(!toggleRefresh);

  const createTodo = (title: string, tags: string[]) => {
    axios
      .post("/api/v1/todos", { todo: { title: title, tags: tags } })
      .then(response => {
        setTodos(todos.concat(response.data));
        refreshTodos();
      })
      .catch(error => dialog.alert("Error, unable to create Todo.\n" + error));
  };

  const updateTodo = (id: number, title: string, tags: string[]) => {
    axios
      .put(`/api/v1/todos/${id}`, {
        todo: { title: title, tags: tags }
      })
      .then(response => {
        console.log(response);
        refreshTodos();
      })
      .catch(err => dialog.alert("Error, unable to update Todo\n" + err));
  };

  const deleteTodo = (id: number) => {
    axios
      .delete(`/api/v1/todos/${id}`)
      .then(response => {
        refreshTodos();
      })
      .catch(error => dialog.alert("Error, unable to delete Todo.\n" + error));
  };

  const deleteSelectedTodos = () => {
    dialog
      .confirm("Are you sure you want to delete these Todos?")
      .then(() => {
        selectedTodos.forEach(id => {
          deleteTodo(id);
        });
        setSelectedTodos([]);
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

  const handleAddTodoBoxSave = (title: string, tags: string[]) => {
    createTodo(title, tags);
    setAddTodoBoxOpen(false);
  };

  const handleAddTodoBoxCancel = (nc: boolean) => {
    if (nc) {
      setAddTodoBoxOpen(false);
    } else {
      dialog
        .confirm("Are you sure you want to cancel without saving?")
        .then(() => setAddTodoBoxOpen(false))
        .catch(() => {});
    }
  };

  const handleDeleteTodo = (id: number) => {
    dialog
      .confirm("Are you sure you want to delete this Todo?")
      .then(() => {
        deleteTodo(id);
      })
      .catch(() => {});
  };

  const openEditBox = (id: number, value: string, tags: string[]) => {
    setEditTodo({ id: id, title: value, tags: tags, done: false });
    setEditBoxOpen(true);
  };

  const handleEditBoxSave = (title: string, tags: string[]) => {
    setEditBoxOpen(false);
    updateTodo(editTodo.id, title, tags);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value.trim();
    if (searchString === "") {
      refreshTodos();
    } else {
      filterTodos(searchString.split(" "));
    }
  };

  const filterTodos = (searchString: string[]) => {
    console.log(searchString);
    setDisplayedTodos(
      todos.filter(todo => {
        return (
          searchString.some(word => todo.title.includes(word)) ||
          todo.tags.find(tag => searchString.some(word => tag.includes(word)))
        );
      })
    );
  };

  const handleTagClick = (tag: string) => {
    const currSearchString = searchBar.current.value;
    if (currSearchString.trim() === "") {
      searchBar.current.value = tag;
    } else {
      searchBar.current.value = currSearchString + " " + tag;
    }
    filterTodos(searchBar.current.value);
    searchBar.current.focus();
  };

  const handleSelect = (id: number) => {
    const currIndex = selectedTodos.indexOf(id);
    const newSelectedTodos = [...selectedTodos];
    if (currIndex === -1) {
      newSelectedTodos.push(id);
    } else {
      newSelectedTodos.splice(currIndex, 1);
    }
    setSelectedTodos(newSelectedTodos);
  };

  const handleSelectAll = () => {
    if (selectedTodos.length !== displayedTodos.length) {
      const ids: number[] = [];
      displayedTodos.forEach(todo => {
        ids.push(todo.id);
      });
      setSelectedTodos(ids);
    } else {
      setSelectedTodos([]);
    }
  };

  useEffect(() => {
    axios
      .get(`/api/v1/todos`)
      .then(response => {
        if (response.data !== null) {
          setTodos(response.data);
          setDisplayedTodos(response.data);
          setLoading(false);
        }
      })
      .catch(err => dialog.alert("Error, unable to fetch Todos.\n" + err));
  }, [dialog, toggleRefresh]);

  return (
    <div className="container">
      <LogoutButton onClick={logout} />
      <div className="inputContainer">
        <input
          ref={searchBar}
          className="taskInput"
          type="text"
          placeholder="Search for a task"
          maxLength={50}
          onChange={handleSearch}
        />
        <Tooltip title="Add todo" arrow>
          <StyledAddIcon onClick={() => setAddTodoBoxOpen(true)} />
        </Tooltip>
        <AddTodoBox
          open={addTodoBoxOpen}
          save={(s: string, t: string[]) => handleAddTodoBoxSave(s, t)}
          cancel={(nc: boolean) => handleAddTodoBoxCancel(nc)}
        />
      </div>
      <StyledTaskList>
        {loading ? (
          <div />
        ) : displayedTodos.length === 0 ? (
          <div>You have no todos currently.</div>
        ) : (
          displayedTodos.map(todo => {
            return (
              <StyledTaskItem key={todo.id} role={undefined} dense button>
                <ListItemIcon>
                  <StyledCheckbox
                    onChange={() => handleSelect(todo.id)}
                    checked={selectedTodos.indexOf(todo.id) !== -1}
                    edge="start"
                  />
                </ListItemIcon>
                <StyledListItemText>
                  <label>{todo.title}</label>
                  <div
                    style={{
                      fontSize: "0.85em",
                      marginTop: "5px",
                      color: "gray",
                      padding: "0"
                    }}
                  >
                    <span>Tags:&nbsp;</span>
                    {todo.tags.length === 0
                      ? "-"
                      : todo.tags.map(tag => {
                          return (
                            <StyledChip
                              clickable
                              onClick={() => handleTagClick(tag)}
                              label={tag}
                              variant="outlined"
                            />
                          );
                        })}
                  </div>
                </StyledListItemText>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => openEditBox(todo.id, todo.title, todo.tags)}
                  >
                    <Tooltip title="Edit" arrow>
                      <EditIcon />
                    </Tooltip>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <span>
                      <Tooltip title="Delete" arrow>
                        <DeleteIcon />
                      </Tooltip>
                    </span>
                  </IconButton>
                </ListItemSecondaryAction>
              </StyledTaskItem>
            );
          })
        )}
      </StyledTaskList>
      <EditBox
        id={editTodo.id}
        defaultTitle={editTodo.title}
        defaultTags={editTodo.tags}
        open={editBoxOpen}
        save={(s: string, t: string[]) => handleEditBoxSave(s, t)}
        cancel={(nc: boolean) => handleEditBoxCancel(nc)}
      />
      {selectedTodos.length > 0 ? (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "0",
            left: "0",
            margin: "0 auto"
          }}
        >
          <Tooltip title="Toggle select all" arrow>
            <Fab
              style={{
                marginRight: "10px"
              }}
              color="primary"
              aria-label="Delete"
              onClick={handleSelectAll}
            >
              <SelectAllIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <Fab
              color="secondary"
              aria-label="Delete"
              onClick={deleteSelectedTodos}
            >
              <DeleteIcon />
            </Fab>
          </Tooltip>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TodosContainer;
