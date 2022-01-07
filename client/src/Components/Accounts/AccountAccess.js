import "./styles/AccountAccess.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const AccountAccess = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="accountAccess">
      {isLoading && <p>Loading account information..</p>}
      {isAuthenticated && !isLoading && (
        <Link className="accountBtn" to="/account">
          Account
        </Link>
      )}

      {isAuthenticated && !isLoading && (
        <button
          className="logout"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log Out
        </button>
      )}
      {!isAuthenticated && !isLoading && (
        <button className="login" onClick={loginWithRedirect}>
          Login
        </button>
      )}
    </div>
  );
};

export default AccountAccess;
