import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

function Header({navBg}) {
  return (
    <div className="header">
      <NavLink className={navBg.mybody ? "bg" : "no-bg"} to="/">Описание</NavLink>
      <NavLink className={navBg.home ? "bg" : "no-bg"}to="/home">Рабочая область</NavLink>
    </div>
  );
}

export default Header;
