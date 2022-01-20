import "./styles/footer.css";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/hiring">Looking for workers?</Link>
    </footer>
  );
};

export default Footer;
