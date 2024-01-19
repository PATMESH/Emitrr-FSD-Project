import React from "react";
import { Link } from "react-router-dom";
import img1 from "../img/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faUsers, faBook } from "@fortawesome/free-solid-svg-icons";

function SideBar({ current, menu }) {
  return menu ? (
    <div id="sidebar">
      <Link to={"/dashboard"} className="brand a">
        <img src={img1} alt="" />
        <span className="text" id="admin">
          LMS Admin
        </span>
      </Link>

      <ul className="side-menu">
        <li className={current === "dashboard" ? "active" : ""}>
          <Link to={"/dashboard"} className="a">
            <FontAwesomeIcon icon={faDashboard} id="i" />
            <span className="text">Dashboard</span>
          </Link>
        </li>
        <li className={current === "user" ? "active" : ""}>
          <Link to={"/Dusers"} className="a">
            <FontAwesomeIcon icon={faUsers} id="i" />
            <span className="text">Users</span>
          </Link>
        </li>
        <li className={current === "languages" ? "active" : ""}>
          <Link to={"/DLanguages"} className="a">
            <FontAwesomeIcon icon={faBook} id="i" />
            <span className="text">Languages</span>
          </Link>
        </li>
      </ul>
    </div>
  ) : null;
}

export default SideBar;
