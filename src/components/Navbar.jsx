import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [id, setId] = useState("");
  const [open, setOpen] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
      setOpen("open");
    } else {
      setIsOpen((prevIsOpen) => !prevIsOpen);
      setOpen("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id);
    window.location.href = `/${id}`;
  };

  const handleClick = (e) => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>CodeBin</h1>
        </Link>
        <div className="menu"></div>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <button>+ Paste</button>
              </Link>
            </li>
            <li>
              <form className="search-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="query"
                  className="search-box"
                  placeholder="Search..."
                  onChange={(e) => setId(e.target.value)}
                  value={id}
                  autoComplete="off"
                />
                <button disabled={id ? false : true} className="search-btn">
                  Search
                </button>
              </form>
            </li>
            {user && (
              <>
                <li>{user.email}</li>
                <li>
                  <button onClick={handleClick}>Logout</button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div id="hamburger-icon" className={open} onClick={handleOpen}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
          <ul className="mobile-menu">
            <li>
              <Link to="/">+ Paste</Link>
            </li>
            {user && (
              <>
                <li>{user.email}</li>
                <li>
                  <button onClick={handleClick}>Logout</button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
