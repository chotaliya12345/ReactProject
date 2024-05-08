import { createContext, useReducer } from "react";
import axios from "axios";
import { crudReducer } from "./reducer/crud.reducer";
import { BASE_URL } from "../utils/baseURL";
import { ADDINTRO, DELETEINTRO, EDITINTRO, GETINTRO } from "./ActionTypes";
import React from "react";

const initialState = {
  isLoading: false,
  crud: [],
  error: null,
};

export const CrudContext = createContext();

export const CrudProvider = ({ children }) => {
  const [state, dispatch] = useReducer(crudReducer, initialState);

  const getCrud = async () => {
    try {
      const response = await axios.get(BASE_URL + "crud");
      console.log(response);
      dispatch({ type: GETINTRO, payload: response.data });
    } catch (error) {
      return error.message;
    }
  };
  const addCrud = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(BASE_URL + "crud", data);
      dispatch({ type: ADDINTRO, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const editCrud = async (data) => {
    try {
      const response = await axios.put(BASE_URL + "crud/" + data.id, data);
      dispatch({ type: EDITINTRO, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCrud = async (id) => {
    try {
      await axios.delete(BASE_URL + "crud/" + id);
      dispatch({ type: DELETEINTRO, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CrudContext.Provider
      value={{
        ...state,
        getCrud,
        addCrud,
        editCrud,
        deleteCrud
      }}
    >
      {children}
    </CrudContext.Provider>
  );
};
