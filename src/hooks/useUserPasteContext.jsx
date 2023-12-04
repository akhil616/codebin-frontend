import { useContext } from "react";
import { UserPasteContext } from "../context/UserPasteContext";

export const useUserPasteContext = () => {
  const context = useContext(UserPasteContext);
  if (!context) {
    throw Error(
      "useUserPasteContext must be used inside the UserPasteContextProvider"
    );
  }
  return context;
};
