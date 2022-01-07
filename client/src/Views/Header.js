import "./styles/header.css";
import "./styles/menu.css";

import { Link } from "react-router-dom";
import { useState } from "react";

import AccountAccess from "../Components/Accounts/AccountAccess";
import getWindowDimensions from "../Utils/getWindowDimensions";
import { slide as Menu } from "react-burger-menu";

const Header = () => {
  const [menuState, setMenuState] = useState(false);
  const { width } = getWindowDimensions();

  const handleClose = () => {
    setMenuState(false);
  };

  return (
    <div className="header">
      {width < 1024 && (
        <>
          <Menu width={width > 425 ? width / 4 : "55%"} isOpen={menuState}>
            <Link to="/" onClick={handleClose}>
              Home
            </Link>
            <Link to="/about" onClick={handleClose}>
              About
            </Link>
            <Link to="/contact" onClick={handleClose}>
              Contact
            </Link>
            <Link to="/create" onClick={handleClose}>
              Post a job!
            </Link>
            <AccountAccess />
          </Menu>
          {/* <p className="headerTitle">JobDir NZ</p> */}
        </>
      )}

      {width > 1023 && (
        <div className="navLinks">
          <Link className="navLink" to="/" onClick={handleClose}>
            Home
          </Link>
          <Link className="navLink" to="/about" onClick={handleClose}>
            About
          </Link>
          <Link className="navLink" to="/contact" onClick={handleClose}>
            Contact
          </Link>
          <Link className="navLink" to="/create" onClick={handleClose}>
            Post a job!
          </Link>
          <AccountAccess />
        </div>
      )}
    </div>
  );
};

export default Header;
