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
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Container from "@material-ui/core/Container";
import SortIcon from "@material-ui/icons/Sort";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

interface Todo {
  id: number;
  title: string;
  tags: string[];
  done: boolean;
  deadline: string;
  created_at: string;
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
  marginRight: "8px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#DDDDDD"
  }
});

const StyledSortIcon = styled(SortIcon)({
  marginRight: "2px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#DDDDDD"
  }
});

const StyledDeadline = styled(({ overdue, ...props }) => (
  <Tooltip
    classes={{ popper: props.className, tooltip: "tooltip", arrow: "arrow" }}
    {...props}
  />
))({
  zIndex: 0,
  "& .arrow": {
    color: props => (props.overdue ? "red" : "")
  },
  "& .tooltip": {
    fontSize: "0.75em",
    backgroundColor: props => (props.overdue ? "red" : "")
  }
});

const StyledSortMenu = styled(Select)({
  "& #select": {
    visibility: "hidden",
    minWidth: 0,
    padding: 0,
    margin: 0,
    width: 0,
    height: 0
  }
});

const TodosContainer = () => {
  const dialog = useDialog();
  const searchBar: any = useRef(null);
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tagList, setTagList] = useState<Object[]>([]);
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([]);
  const [toggleRefresh, setRefresh] = useState(false);
  const [editBoxOpen, setEditBoxOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo>({
    id: 0,
    title: "",
    tags: [],
    done: false,
    deadline: "",
    created_at: ""
  });
  const [addTodoBoxOpen, setAddTodoBoxOpen] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  const [filterFunction, setFilterFunction] = useState<
    null | ((t: Todo) => boolean)
  >(null);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const [sortFunction, setSortFunction] = useState<
    null | ((a: Todo, b: Todo) => number)
  >(null);
  const refreshTodos = () => setRefresh(!toggleRefresh);

  const createTodo = (title: string, tags: string[], deadline: string) => {
    axios
      .post("/api/v1/todos", {
        todo: { title: title, tags: tags, deadline: deadline, done: false }
      })
      .then(response => {
        setTodos(todos.concat(response.data));
        refreshTodos();
      })
      .catch(error => dialog.alert("Error, unable to create Todo.\n" + error));
  };

  const updateTodo = (todo: Todo) => {
    axios
      .put(`/api/v1/todos/${todo.id}`, {
        todo
      })
      .then(response => {
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
      .confirm("Are you sure you want to permanently delete these Todos?")
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

  const handleAddTodoBoxSave = (
    title: string,
    tags: string[],
    deadlineAdded: boolean,
    deadline: Date | null
  ) => {
    let deadlineString = "";
    if (deadlineAdded && deadline !== null) {
      deadlineString = deadline.toLocaleDateString();
    }
    createTodo(title, tags, deadlineString);
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

  const openEditBox = (todo: Todo) => {
    setEditTodo(todo);
    setEditBoxOpen(true);
  };

  const handleEditBoxSave = (
    title: string,
    tags: string[],
    deadlineAdded: boolean,
    deadline: Date | null
  ) => {
    let deadlineString = "";
    if (deadlineAdded && deadline !== null) {
      deadlineString = deadline.toLocaleDateString();
    }
    setEditBoxOpen(false);
    const newTodo: Todo = {
      id: editTodo.id,
      title: title,
      done: editTodo.done,
      tags: tags,
      deadline: deadlineString,
      created_at: editTodo.created_at
    };
    updateTodo(newTodo);
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

  const handleToggleDone = (todo: Todo) => {
    const newDone: boolean = !todo.done;
    const newTodo: Todo = {
      ...todo,
      done: newDone
    };
    updateTodo(newTodo);
  };

  const toggleDoneSelectedTodos = () => {
    displayedTodos.forEach(todo => {
      if (selectedTodos.indexOf(todo.id) !== -1) {
        handleToggleDone(todo);
      }
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value.trim();
    filterTodos(searchString.split(" "));
  };

  const handleTagClick = (e: React.MouseEvent<HTMLDivElement>, tag: string) => {
    e.stopPropagation();
    const currSearchString = searchBar.current.value;
    if (currSearchString.split(" ").includes(tag)) {
      return;
    } else if (currSearchString.trim() === "") {
      searchBar.current.value = tag;
    } else {
      searchBar.current.value = currSearchString + " " + tag;
    }
    filterTodos(searchBar.current.value.split(" "));
    searchBar.current.focus();
  };

  const filterTodos = (searchString: string[]) => {
    setFilterFunction(() => (todo: Todo) => {
      if (searchString === [""]) return true;
      return Boolean(
        searchString.some(word => todo.title.includes(word)) ||
          todo.tags.find(tag => searchString.some(word => tag.includes(word)))
      );
    });
  };

  const handleSortMenuChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as string;
    sortBy(value);
  };

  const sortBy = (criteria: string) => {
    setSelectedSort(criteria);
    if (criteria === "Date created") {
      setSortFunction(() => dateCreatedSort);
    } else if (criteria === "Done status") {
      setSortFunction(() => (a: Todo, b: Todo) => {
        const done = doneStatusSort(a, b);
        if (done !== 0) return done;
        return dateCreatedSort(a, b);
      });
    } else if (criteria === "Deadline") {
      setSortFunction(() => (a: Todo, b: Todo) => {
        const done = doneStatusSort(a, b);
        if (done !== 0) {
          return done;
        }
        return deadlineSort(a, b);
      });
    }
    setSortMenuOpen(false);
  };

  const dateCreatedSort = (a: Todo, b: Todo) => {
    if (new Date(a.created_at).getTime() < new Date(b.created_at).getTime()) {
      return 1;
    } else if (
      new Date(a.created_at).getTime() > new Date(b.created_at).getTime()
    ) {
      return -1;
    }
    return 0;
  };

  const doneStatusSort = (a: Todo, b: Todo) => {
    if (a.done && !b.done) {
      return 1;
    } else if (b.done && !a.done) {
      return -1;
    }
    return 0;
  };

  const deadlineSort = (a: Todo, b: Todo) => {
    if (a.deadline === "" && b.deadline === "") {
      return 0;
    }
    if (a.deadline === "" && b.deadline !== "") {
      return 1;
    } else if (a.deadline !== "" && b.deadline === "") {
      return -1;
    }

    if (new Date(a.deadline).getTime() > new Date(b.deadline).getTime()) {
      return 1;
    } else if (
      new Date(a.deadline).getTime() < new Date(b.deadline).getTime()
    ) {
      return -1;
    }
    return 0;
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

  const checkIfOverdue = (deadline: string) => {
    const numOfDays = Math.round(
      (new Date(deadline).setHours(0, 0, 0, 0) -
        new Date().setHours(0, 0, 0, 0)) /
        (1000 * 3600 * 24)
    );
    if (numOfDays < 0) {
      return "Overdue!";
    } else if (numOfDays === 1) {
      return `Due in 1 day.`;
    } else if (numOfDays === 0) {
      return `Due today!`;
    } else {
      return `Due in ${numOfDays} days.`;
    }
  };

  useEffect(() => {
    let newTodos = [...todos];
    if (filterFunction !== null) {
      newTodos = newTodos.filter(filterFunction);
    }
    if (sortFunction !== null) {
      newTodos.sort(sortFunction);
    }
    setDisplayedTodos(newTodos);
  }, [sortFunction, filterFunction, todos]);

  useEffect(() => {
    axios
      .get("/api/v1/todos")
      .then(response => {
        if (response.data !== null) {
          setDisplayedTodos(response.data);
          setTodos(response.data);
          sortBy("Deadline");
          setLoading(false);
        }
      })
      .catch(err => dialog.alert("Error, unable to fetch Todos.\n" + err));
    axios
      .get("/api/v1/tags")
      .then(response => {
        if (response.data !== null && response.data.length !== 0) {
          const tl = [...new Set(response.data)] as string[];
          let objtl = [] as Object[];
          tl.forEach((tag: string) => {
            objtl.push({ value: tag, label: tag });
          });
          setTagList(objtl);
        }
      })
      .catch(err => console.log(err));
  }, [dialog, toggleRefresh]);

  return (
    <Container
      style={{ width: "60%", minWidth: "400px", marginBottom: "35px" }}
      maxWidth="md"
    >
      <LogoutButton onClick={logout} />
      <FormControl
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          marginBottom: "35px"
        }}
        fullWidth
        variant="outlined"
      >
        <OutlinedInput
          inputRef={searchBar}
          notched={false}
          id="outlined-adornment-search"
          type="text"
          onChange={handleSearch}
          placeholder="Search for a todo, space to separate search terms"
          labelWidth={60}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title="Add todo" arrow>
                <StyledAddIcon onClick={() => setAddTodoBoxOpen(true)} />
              </Tooltip>
              <StyledSortMenu
                disableUnderline
                labelId="label"
                id="select"
                value={selectedSort}
                IconComponent={() => (
                  <Tooltip title="Sort by" arrow>
                    <StyledSortIcon onClick={() => setSortMenuOpen(true)} />
                  </Tooltip>
                )}
                open={sortMenuOpen}
                onClose={() => setSortMenuOpen(false)}
                onChange={handleSortMenuChange}
              >
                <MenuItem value="Date created">Date created</MenuItem>
                <MenuItem value="Done status">Done status</MenuItem>
                <MenuItem value="Deadline">Deadline</MenuItem>
              </StyledSortMenu>
            </InputAdornment>
          }
        />
      </FormControl>
      <AddTodoBox
        tagList={tagList}
        open={addTodoBoxOpen}
        save={(s: string, t: string[], da: boolean, deadline: Date | null) =>
          handleAddTodoBoxSave(s, t, da, deadline)
        }
        cancel={(nc: boolean) => handleAddTodoBoxCancel(nc)}
      />
      <StyledTaskList>
        {loading ? (
          <div />
        ) : todos.length === 0 ? (
          <div style={{ color: "#DDDDDD" }}>You have no todos currently.</div>
        ) : (
          displayedTodos.map(todo => {
            return (
              <StyledTaskItem
                key={todo.id}
                onClick={() => handleSelect(todo.id)}
                dense
                button
                style={{
                  textDecoration: todo.done ? "line-through" : "none",
                  backgroundColor: todo.done
                    ? "#888888"
                    : selectedTodos.indexOf(todo.id) === -1
                    ? "white"
                    : "#CCCCCC"
                }}
              >
                <ListItemIcon>
                  <StyledDeadline
                    open={
                      todo.deadline !== "" &&
                      todo.deadline !== null &&
                      !todo.done
                    }
                    arrow
                    overdue={checkIfOverdue(todo.deadline) === "Overdue!"}
                    title={checkIfOverdue(todo.deadline)}
                    placement="left"
                  >
                    <StyledCheckbox
                      checked={selectedTodos.indexOf(todo.id) !== -1}
                      edge="start"
                    />
                  </StyledDeadline>
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
                              onClick={e => handleTagClick(e, tag)}
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
                    onClick={() => openEditBox(todo)}
                  >
                    <Tooltip title="Edit" arrow>
                      <EditIcon />
                    </Tooltip>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="toggle done"
                    onClick={() => handleToggleDone(todo)}
                  >
                    <Tooltip title="Toggle done" arrow>
                      {todo.done ? (
                        <CheckCircleIcon />
                      ) : (
                        <CheckCircleOutlineIcon />
                      )}
                    </Tooltip>
                  </IconButton>
                </ListItemSecondaryAction>
              </StyledTaskItem>
            );
          })
        )}
      </StyledTaskList>
      <EditBox
        tagList={tagList}
        id={editTodo.id}
        defaultTitle={editTodo.title}
        defaultTags={editTodo.tags}
        defaultDeadline={editTodo.deadline}
        open={editBoxOpen}
        save={(s: string, t: string[], da: boolean, deadline: Date | null) =>
          handleEditBoxSave(s, t, da, deadline)
        }
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
              aria-label="select all"
              onClick={handleSelectAll}
            >
              <SelectAllIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Toggle done" arrow>
            <Fab
              style={{
                marginRight: "10px"
              }}
              color="primary"
              aria-label="toggle done"
              onClick={toggleDoneSelectedTodos}
            >
              <CheckCircleIcon />
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
        ""
      )}
    </Container>
  );
};

export default TodosContainer;
