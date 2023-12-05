import React, { useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { usePasteContext } from "../hooks/usePasteContext";
import UserPaste from "../components/UserPaste";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserPasteContext } from "../hooks/useUserPasteContext";

const Home = () => {
  const { dispatch } = usePasteContext();
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState(null);
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch: userPasteDispatch } = useUserPasteContext();
  const ref = useRef();

  // console.log(`${import.meta.env.VITE_BASE_URL}/api/pastes/`);

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
    const paste = { title, visibility, body };
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/pastes/`,
      {
        method: "POST",
        body: JSON.stringify(paste),
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
      console.log("new paste added", json);
      if (user) {
        userPasteDispatch({ type: "CREATE_PASTE", payload: json });
      }
      if (json.visibility === "Public") {
        dispatch({ type: "CREATE_PASTE", payload: json });
      }
      window.location.href = `/${json._id}`;
    }
  };

  return (
    <div className="home">
      <div className="create">
        <h3>Add New Paste</h3>
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
            spellCheck={false}
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
          <button>Create New Paste</button>
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

export default Home;
