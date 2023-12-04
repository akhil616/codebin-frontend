import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const user = useContext(AuthContext);
  if (!user) {
    throw Error("AuthContext must be used inside the AuthContextProvider");
  }
  return user;
};
