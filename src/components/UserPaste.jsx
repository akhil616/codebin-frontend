import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePasteContext } from "../hooks/usePasteContext";
import PasteDetails from "./PasteDetails";
import { useUserPasteContext } from "../hooks/useUserPasteContext";

const UserPaste = () => {
  // const { pastes, dispatch } = usePasteContext();
  // const [pastes, setPastes] = useState([]);
  const { pastes, dispatch } = useUserPasteContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchPaste = async () => {
      const response = await fetch("http://localhost:5500/api/mypastes/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_PASTES", payload: json });
      }
      // setPastes(json);
    };
    fetchPaste();
  }, [user]);
  return (
    <div>
      <h2 className="mypaste">My Pastes</h2>
      <div className="pastedetails">
        <div className="pastes">
          {pastes &&
            pastes.map((paste) => (
              <PasteDetails key={paste._id} paste={paste} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserPaste;
