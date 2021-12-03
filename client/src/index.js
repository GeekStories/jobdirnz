import "./index.css";

import Auth0ProviderWithHistory from "./Components/Auth/Auth0ProviderWithHistory";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";

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