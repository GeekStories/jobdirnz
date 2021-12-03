import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <p>Loading</p>,
    })}
    {...args}
  />
);

export default ProtectedRoute;