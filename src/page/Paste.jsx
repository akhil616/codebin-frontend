import React, { useEffect, useRef, useState } from "react";
import { useLocation, redirect, Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserPaste from "../components/UserPaste";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePasteContext } from "../hooks/usePasteContext";
const Paste = () => {
  const { user } = useAuthContext();
  const { dispatch } = usePasteContext();
  // const location = useLocation();
  // const { paste } = location.state;
  const [copy, setCopy] = useState("none");
  const [paste, setPaste] = useState({});
  const { id } = useParams();
  const ref = useRef();

  const copyClicked = () => {
    navigator.clipboard.writeText(paste.body);
    setCopy("");
    setTimeout(() => {
      setCopy("none");
    }, 700);
  };

  useEffect(() => {
    const getPaste = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/pastes/${id}`
      );
      const json = await response.json();
      if (!response.ok) {
        window.location.href = "/404";
      }
      setPaste(json);
    };
    getPaste();
  }, [id]);

  const deletePaste = async (e) => {
    e.preventDefault();
    console.log(paste._id);
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/pastes/${paste._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_PASTE", payload: json });
      window.location.href = json.redirect;
    }
  };
  return (
    <>
      <div className="home">
        <div className="paste">
          <h2>{paste.title}</h2>
          <textarea
            style={{ overflow: "auto" }}
            readOnly
            value={paste.body}
            ref={ref}
          ></textarea>
          <div className="icon">
            <span
              style={{
                display: copy,
                color: "#4caf50",
                transition: "all 1s ease",
              }}
            >
              <b>copied</b>
            </span>
            <span onClick={copyClicked}>copy</span>
            {user && user._id === paste.user_id && (
              <>
                <span>
                  <Link to={`/edit/${paste._id}`} state={{ paste }}>
                    edit
                  </Link>
                </span>
                <span onClick={deletePaste}>delete</span>
              </>
            )}
          </div>
        </div>
        <div className="sidebar">
          {user && <UserPaste />}
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Paste;
