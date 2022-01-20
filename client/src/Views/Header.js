import "./styles/header.css";
import "./styles/menu.css";

import { Link } from "react-router-dom";

import getWindowDimensions from "../Utils/getWindowDimensions";
import AccountAccess from "../Components/Accounts/AccountAccess";
import FullNav from "../Components/Header/FullNav";
import { slide as Menu } from "react-burger-menu";

const Header = () => {
  const { width } = getWindowDimensions();
  return (
    <div className="header">
      {width < 1024 && (
        <Menu width={width > 425 ? width / 3 : "55%"}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/create">Post a job!</Link>
          <AccountAccess />
        </Menu>
      )}

      {width > 1023 && <FullNav />}
    </div>
  );
};

export default Header;
