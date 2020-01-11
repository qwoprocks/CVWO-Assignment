export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const FETCH_TODOS = "FETCH_TODOS";
export const FETCH_TAGS = "FETCH_TAGS";

export type TodoActionTypes =
    | typeof ADD_TODO
    | typeof UPDATE_TODO
    | typeof DELETE_TODO
    | typeof FETCH_TODOS
    | typeof FETCH_TAGS;

export const GET_SESSION = "GET_SESSION";
export const SESSION_LOGIN = "SESSION_LOGIN";
export const SESSION_SIGNUP = "SESSION_SIGNUP";
export const SESSION_LOGOUT = "SESSION_LOGOUT";

export type SessionActionTypes =
    | typeof GET_SESSION
    | typeof SESSION_LOGIN
    | typeof SESSION_SIGNUP
    | typeof SESSION_LOGOUT;
