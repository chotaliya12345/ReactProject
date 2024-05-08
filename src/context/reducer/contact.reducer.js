import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, GET_CONTACT } from "../ActionTypes";

export const contactReducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case ADD_CONTACT:
      return {
        contact: state.contact.concat(action.payload),
      };
    case GET_CONTACT:
      return {
        contact: action.payload,
      };
    case DELETE_CONTACT:
      return {
        isLoading: false,
        contact: state.contact.filter((v) => v.id !== action.payload),
        error: null,
      };
      case EDIT_CONTACT:
        return {
          ...state,
          contact: state.contact.map((v) =>
            v.id === action.payload.id ? action.payload : v
          ),
        };
    default:
      return state;
  }
};
