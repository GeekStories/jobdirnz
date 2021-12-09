import "./styles/MenuLinks.css";

import LoginButton from "../Accounts/LoginButton";
import { Link } from "react-router-dom";

const MenuLinks = () => {
  return (
    <div className="navLinks">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/employer">Hiring?</Link>
      <Link to="/create">Post a job!</Link>
      <LoginButton />
    </div>
  );
};

export default MenuLinks;
