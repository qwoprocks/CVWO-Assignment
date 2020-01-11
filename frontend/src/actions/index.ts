import axios from "axios";
import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  FETCH_TODOS,
  FETCH_TAGS,
  GET_SESSION,
  SESSION_SIGNUP,
  SESSION_LOGIN,
  SESSION_LOGOUT
} from "./types";

interface Todo {
  id: number;
  title: string;
  tags: string[];
  done: boolean;
  deadline: string;
  created_at: string;
}

export const createTodo = (title: string, tags: string[], deadline: string) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/todos", {
          todo: { title: title, tags: tags, deadline: deadline, done: false }
        })
        .then(response => {
          dispatch(createTodoSuccess(response.data));
          resolve();
        })
        .catch(error => {
          reject(String(error));
        });
    });
  };
};

export const createTodoSuccess = (response: any) => {
  return {
    type: ADD_TODO,
    response
  };
};

export const updateTodo = (todo: Todo) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`/api/v1/todos/${todo.id}`, {
          todo
        })
        .then(response => {
          dispatch(updateTodoSuccess(response.data));
          resolve();
        })
        .catch(error => {});
    });
  };
};

export const updateTodoSuccess = (response: any) => {
  return {
    type: UPDATE_TODO,
    response
  };
};

export const deleteTodo = (id: number) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/v1/todos/${id}`)
        .then(response => {
          dispatch(deleteTodoSuccess(response.data));
          resolve();
        })
        .catch(error => {
          reject(String(error));
        });
    });
  };
};

export const deleteTodoSuccess = (response: any) => {
  return {
    type: DELETE_TODO,
    response
  };
};

export const fetchTodos = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/v1/todos")
        .then(response => {
          if (response.data !== null) {
            dispatch(fetchTodosSuccess(response.data));
            resolve();
          }
        })
        .catch(error => {
          reject(String(error));
        });
    });
  };
};

export const fetchTodosSuccess = (todos: any[]) => {
  return {
    type: FETCH_TODOS,
    todos
  };
};

export const fetchTags = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/v1/tags")
        .then(response => {
          if (response.data !== null) {
            dispatch(fetchTagsSuccess(response.data));
            resolve();
          }
        })
        .catch(error => {
          reject(String(error));
        });
    });
  };
};

export const fetchTagsSuccess = (tags: any[]) => {
  return {
    type: FETCH_TAGS,
    tags
  };
};

export const getSession = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/v1/session", { withCredentials: true })
        .then(response => {
          dispatch(getSessionSuccess(response.data));
          resolve();
        })
        .catch(error => {
          reject(String(error));
        });
    });
  };
};

export const getSessionSuccess = (session: any) => {
  return {
    type: GET_SESSION,
    session
  };
};

export const sessionSignup = (
  email: string,
  username: string,
  password: string
) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/users", {
          user: {
            email: email,
            username: username,
            password: password
          },
          withCredentials: true
        })
        .then(response => {
          if (response.data.error) {
            reject(String(response.data.error));
          } else {
            dispatch(sessionSignupSuccess(response.data));
            resolve();
          }
        })
        .catch(err => reject(String(err)));
    });
  };
};

export const sessionSignupSuccess = (session: any) => {
  return {
    type: SESSION_SIGNUP,
    session
  };
};

export const sessionLogin = (email: string, password: string) => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/session", {
          email: email,
          password: password,
          withCredentials: true
        })
        .then(response => {
          if (response.data.error) {
            reject(String(response.data.error));
          } else {
            dispatch(sessionLoginSuccess(response.data));
            resolve();
          }
        })
        .catch(err => reject(String(err)));
    });
  };
};

export const sessionLoginSuccess = (session: any) => {
  return {
    type: SESSION_LOGIN,
    session
  };
};

export const sessionLogout = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      axios
        .delete("/api/v1/session/0")
        .then(response => {
          dispatch(sessionLogoutSuccess(response.data));
          resolve();
        })
        .catch(err => reject(String(err)));
    });
  };
};

export const sessionLogoutSuccess = (session: any) => {
  return {
    type: SESSION_LOGOUT,
    session
  };
};
