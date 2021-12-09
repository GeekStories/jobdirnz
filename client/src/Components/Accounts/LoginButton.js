import "./styles/LoginButton.css";

import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <p>Loading account information..</p>;
  }

  if (isAuthenticated) {
    return (
      <button className="logout" onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
    );
  }

  return <button className="login" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
