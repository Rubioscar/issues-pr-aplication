import "scss/header.scss";
import React from "react";

const Header = React.memo(() => (
  <div className="header">
    <nav className="nav">
      <div className="boxlogotitle">
        <div className="title">Test Project</div>
      </div>
    </nav>
  </div>
));

export default Header;
