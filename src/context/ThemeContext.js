import { createContext, useReducer } from "react";
import { themeReducer } from "./reducer/theme.reducer";
import { TOGGLE_THEME } from "./ActionTypes";
import React from 'react';

const initialState = {
  theme: "light",
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggleTheme = () => {
    const newTheme = state.theme === "light" ? "dark" : "light";

    dispatch({ type: TOGGLE_THEME, payload: newTheme });
  };

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
