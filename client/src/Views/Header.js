import "./styles/header.css";
import "./styles/menu.css";

import MenuLinks from "../Components/Header/MenuLinks";
import { slide as Menu } from "react-burger-menu";

const Header = () => {
  return (
    <div className="header">
      <Menu width={"85%"}>
        <MenuLinks />
      </Menu>

      <p className="headerTitle">JobDir NZ</p>
    </div>
  );
};

export default Header;
