import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <a className="navbar-brand" href="/">
        Users Client
      </a>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/users">
            Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Login
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
