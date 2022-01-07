import "./styles/footer.css";

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Footer = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <footer>
      <div className="leftBlock">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="rightBlock">
        <Link to="/hiring">Hiring?</Link>
        {isAuthenticated && <Link to="/account">Account</Link>}
      </div>
    </footer>
  );
};

export default Footer;
