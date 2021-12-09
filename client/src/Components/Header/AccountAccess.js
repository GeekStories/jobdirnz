import "./styles/AccountAccess.css";
import { Link } from "react-router-dom";

const AccountAccess = () => {
  return (
    <Link to="/account" className="accountBtn">
      Account
    </Link>
  );
};

export default AccountAccess;
