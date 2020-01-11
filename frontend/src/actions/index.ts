import axios from "axios";
import { ADD_TODO, DELETE_TODO, FETCH_TODOS, GET_SESSION } from "./types";

export const createTodo = ({ title, tags, deadline, done }: any) => {
  return (dispatch: any) => {
    return axios
      .post("/api/v1/todos", {
        todo: { title: title, tags: tags, deadline: deadline, done: done }
      })
      .then(response => {
        dispatch(createTodoSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const createTodoSuccess = (data: any) => {
  return {
    type: ADD_TODO,
    payload: {
      id: data.id,
      title: data.title,
      tags: data.body,
      deadline: data.deadline,
      done: data.done
    }
  };
};

export const deleteTodo = (id: number) => {
  return (dispatch: any) => {
    return axios
      .delete(`/api/v1/todos/${id}`)
      .then(response => {
        dispatch(deleteTodoSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const deleteTodoSuccess = (id: any) => {
  return {
    type: DELETE_TODO,
    payload: {
      id
    }
  };
};

export const fetchAllTodos = () => {
  return (dispatch: any) => {
    return axios
      .get("/api/v1/todos")
      .then(response => {
        dispatch(fetchTodos(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const fetchTodos = (todos: any[]) => {
  return {
    type: FETCH_TODOS,
    todos
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
}