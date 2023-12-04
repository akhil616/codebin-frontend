import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import UserPaste from "../components/UserPaste";
import Sidebar from "../components/Sidebar";

const NotFound = () => {
  const { user } = useAuthContext();
  return (
    <div className="home">
      <h1 style={{ margin: "50px auto" }}>Page Not Found</h1>
      <div className="sidebar">
        {user && <UserPaste />}
        <Sidebar />
      </div>
    </div>
  );
};

export default NotFound;
