import "./styles/App.css";

import { Routes, Route, useParams } from "react-router-dom";
import RequireAuth from "../Auth/RequireAuth";

import Listing from "./Listing";
import Contact from "./Contact";
import Account from "./Account";
import Create from "./Create";
import Footer from "./Footer";
import Header from "./Header";
import Apply from "./Apply";
import About from "./About";
import Home from "./Home";

const App = () => {
  const { id } = useParams();
  return (
    <div className="content">
      <Header />
      <div className="pageWrapper">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/listing/:id" element={<Listing />} />

          <Route
            path="/account"
            element={
              <RequireAuth employerOnly={false}>
                <Account />
              </RequireAuth>
            }
          />

          <Route
            path="/create"
            element={
              <RequireAuth employerOnly={true}>
                <Create />
              </RequireAuth>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <RequireAuth employerOnly={true}>
                <Create />
              </RequireAuth>
            }
          />

          <Route
            path="/apply/:id"
            element={
              <RequireAuth employerOnly={false}>
                <Apply id={id} />
              </RequireAuth>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
