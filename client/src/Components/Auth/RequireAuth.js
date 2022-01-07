import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, employerOnly }) => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) loginWithRedirect();

  if (employerOnly) {
    if (user["https://jobdir-access-control.com/roles"][0] === "employer") {
      return children;
    }
    return Navigate({ to: "/hiring" });
  }

  return children;
};

export default RequireAuth;
