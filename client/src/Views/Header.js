import "./styles/header.css";
import "./styles/menu.css";

import AccountAccess from "../Components/Header/AccountAccess";
import MenuLinks from "../Components/Header/MenuLinks";
import { slide as Menu } from "react-burger-menu";

const Header = () => {

  return (
    <div className="header">
      <Menu width={"85%"}>
        <MenuLinks />
      </Menu>

      <AccountAccess />
    </div>
  );
};

export default Header;
