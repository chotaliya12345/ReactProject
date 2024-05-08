import { ADDINTRO, DELETEINTRO, EDITINTRO, GETINTRO } from "../ActionTypes";


export const crudReducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case GETINTRO:
      return {
        ...state,
        crud: action.payload,
      };

    case ADDINTRO:
      return {
        ...state,
        crud: state.crud.concat(action.payload),
      };

    case EDITINTRO:
      return {
        ...state,
        crud: state.crud.map((v) =>
          v.id === action.payload.id ? action.payload : v
        ),
      };

    case DELETEINTRO:
      return {
        isLoading: false,
        crud: state.crud.filter((v) => v.id !== action.payload),
        error: null,
      };

    default:
      return state;
  }
};
