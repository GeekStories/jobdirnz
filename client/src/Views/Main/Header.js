import "./menu.css";

import LoginButton from "../../Components/Accounts/LoginButton";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Menu>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <LoginButton />
      </Menu>
    </div>
  );
};

export default Header;
