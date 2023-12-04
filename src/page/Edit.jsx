import React, { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { redirect, useLocation } from "react-router-dom";
import { usePasteContext } from "../hooks/usePasteContext";
import UserPaste from "../components/UserPaste";
import { useAuthContext } from "../hooks/useAuthContext";

const Edit = () => {
  const location = useLocation();
  const { paste } = location.state;

  const [title, setTitle] = useState(paste.title);
  const [visibility, setVisibility] = useState(paste.visibility);
  const [body, setBody] = useState(paste.body);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const ref = useRef(null);
  var config = {};
  if (user) {
    config = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
  } else {
    config = {
      "Content-Type": "application/json",
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patchPaste = { title, visibility, body };
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/pastes/${paste._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(patchPaste),
        headers: config,
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setBody("");
      setVisibility(null);
      setError(null);
      window.location.href = `/${json.redirect}`;
    }
  };

  return (
    <div className="home">
      <div className="create">
        <h3>Edit Paste</h3>
        <form onSubmit={handleSubmit}>
          <label>Paste Name / Title </label>
          <br />
          <input
            required
            className="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="radio">
            <label>
              <input
                required
                name="visibility"
                type="radio"
                value="Public"
                checked={visibility === "Public"}
                onChange={(e) => setVisibility(e.target.value)}
              />
              Public
            </label>
            <label>
              <input
                name="visibility"
                type="radio"
                value="Private"
                checked={visibility === "Private"}
                onChange={(e) => setVisibility(e.target.value)}
              />
              Private
            </label>
          </div>
          <label>Enter Your Paste</label>
          <br />
          <textarea
            required
            ref={ref}
            name="textarea"
            placeholder="Enter your paste"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              ref.current.style.height = "12rem";
              ref.current.style.height = ref.current.scrollHeight + "px";
            }}
          />
          <button>Update Paste</button>
          {error && <div>{error}</div>}
        </form>
      </div>
      <div className="sidebar">
        {user && <UserPaste />}
        <Sidebar />
      </div>
    </div>
  );
};

export default Edit;
