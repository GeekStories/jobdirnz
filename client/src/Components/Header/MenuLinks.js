import "./styles/MenuLinks.css";

import LoginButton from "../Accounts/LoginButton";
import AccountAccess from "./AccountAccess";

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const MenuLinks = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="navLinks">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/create">Post a job!</Link>
      <LoginButton />
      {isAuthenticated && <AccountAccess />}
    </div>
  );
};

export default MenuLinks;
