import "./styles/AccountAccess.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const AccountAccess = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="accountAccess">
      <div className="accountButtonWrapper">
        {isAuthenticated && !isLoading && (
          <button className="button account">
            <Link to="/account">Account</Link>
          </button>
        )}
      </div>

      <div className="logoutButtonWrapper">
        {isAuthenticated && !isLoading && (
          <button
            className="button logout"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </button>
        )}

        <div className="loginButtonWrapper">
          {!isAuthenticated && !isLoading && (
            <button className="button login" onClick={loginWithRedirect}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountAccess;
