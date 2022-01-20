import "./Views/styles/index.css";

import ReactDOM from "react-dom";
import React from "react";
import App from "./Views/App";

import Auth0ProviderWithHistory from "./Auth/Auth0ProviderWithHistory";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
