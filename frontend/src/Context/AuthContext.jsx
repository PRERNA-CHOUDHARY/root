/**
 * @description: AuthContext is used to store the user data in the local storage and provide the user data to the components.
 */

// Importing necessary hooks and components.
import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

// Creating the initial state.
const initialState = {
  user:
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
};

// Creating the AuthContext.
export const AuthContext = createContext(initialState);

// Creating the authReducer.
const authReducer = (state, action) => {
  // Switch case to handle different actions.
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };

    case "LOGOUT":
      return {
        user: null,
        role: null,
        token: null,
      };

    default:
      return state;
  }
};

// Defining the AuthContextProvider.
export const AuthContextProvider = ({ children }) => {
  // Using the useReducer hook.
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Using the useEffect hook to store the user data in the local storage.
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("role", state.role);
    localStorage.setItem("token", state.token);
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
