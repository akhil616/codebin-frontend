import { createContext, useReducer } from "react";

export const UserPasteContext = createContext();
const initialState = {
  pastes: null,
};

export const UserPasteReducer = (state, action) => {
  switch (action.type) {
    case "SET_PASTES":
      return {
        pastes: action.payload,
      };

    case "CREATE_PASTE":
      return {
        pastes: [action.payload, ...state.pastes],
      };

    case "DELETE_PASTE":
      return {
        pastes: state.pastes.filter((p) => p._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export const UserPasteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserPasteReducer, initialState);
  return (
    <UserPasteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserPasteContext.Provider>
  );
};
