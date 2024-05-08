import { createContext, useReducer } from "react";
import { contactReducer } from "./reducer/contact.reducer";
import { BASE_URL } from "../utils/baseURL";
import axios from "axios";
import React from "react";
import { type } from "@testing-library/user-event/dist/type";
import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, GET_CONTACT } from "./ActionTypes";

const initialState = {
  isLoading: false,
  contact: [],
  error: null,
};

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const addContact = async (data) => {
    try {
      const response = await axios.post(BASE_URL + "contact", data);
      dispatch({type: ADD_CONTACT, payload: response.data})
    } catch (error) {
      console.log(error);
    }
  };

  const getContact = async () => {
    try {
      const response = await axios.get(BASE_URL + "contact");
      dispatch({type: GET_CONTACT, payload: response.data})
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(BASE_URL + "contact/" + id);
      dispatch({type: DELETE_CONTACT, payload: id})
    } catch (error) {
      console.log(error);
    }
  };

  const editContact = async (data) => {
    try {
      const response = await axios.put(BASE_URL + "contact/" + data.id, data);
      dispatch({ type: EDIT_CONTACT, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        ...state,
        addContact,
        getContact,
        deleteContact,
        editContact
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
