import { useContext } from "react";
import { PasteContext } from "../context/PasteContext";

export const usePasteContext = () => {
  const context = useContext(PasteContext);
  if (!context) {
    throw Error("usePasteContext must be used inside the PasteContextProvider");
  }
  return context;
};
