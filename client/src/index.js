import "./styles/index.css";

import ReactDOM from "react-dom";
import React from "react";
import App from "./App";

import Auth0ProviderWithHistory from "./Components/Auth/Auth0ProviderWithHistory";
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
