import "./styles/App.css";

import RequireAuth from "./Components/Auth/RequireAuth";
import SingleListing from "./Views/SingleListing";
import { Routes, Route } from "react-router-dom";

import ListingForm from "./Views/ListingForm";
import Contact from "./Views/Contact";
import Account from "./Views/Account";
import Header from "./Views/Header";
import Footer from "./Views/Footer";
import Apply from "./Views/Apply";
import About from "./Views/About";
import Login from "./Views/Login";
import Home from "./Views/Home";

const App = () => {
  return (
    <>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/listing/:id" element={<SingleListing />} />
          <Route path="/login" element={<Login />}></Route>

          <Route
            path="/account"
            element={
              <RequireAuth employer={false}>
                <Account />
              </RequireAuth>
            }
          />

          <Route
            path="/create"
            element={
              <RequireAuth employer={true}>
                <ListingForm />
              </RequireAuth>
            }
          />

          <Route
            path="/apply/:id"
            element={
              <RequireAuth employer={false}>
                <Apply />
              </RequireAuth>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <RequireAuth employer={true}>
                <ListingForm />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
