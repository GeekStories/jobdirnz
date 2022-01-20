import "./styles/fullnav.css";

import { Link } from "react-router-dom";
import AccountAccess from "../Accounts/AccountAccess";

const FullNav = () => {
  return (
    <div className="navLinks">
      <button className="button navLink">
        <Link to="/">Home</Link>
      </button>

      <button className="button navLink">
        <Link to="/about">About</Link>
      </button>

      <button className="button navLink">
        <Link to="/contact">Contact</Link>
      </button>

      <button className="button navLink">
        <Link to="/create">Post a job!</Link>
      </button>

      <AccountAccess />
    </div>
  );
};

export default FullNav;
