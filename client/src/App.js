import "./styles/App.css";

import { Routes, Route, useParams } from "react-router-dom";
import RequireAuth from "./Components/Auth/RequireAuth";
import SingleListing from "./Views/SingleListing";

import ListingForm from "./Views/ListingForm";
import Contact from "./Views/Contact";
import Account from "./Views/Account";
import Header from "./Views/Header";
import Hiring from "./Views/Hiring";
import Footer from "./Views/Footer";
import Apply from "./Views/Apply";
import About from "./Views/About";
import Login from "./Views/Login";
import Home from "./Views/Home";

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
          <Route path="/listing/:id" element={<SingleListing />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/hiring" element={<Hiring />}></Route>

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
                <ListingForm />
              </RequireAuth>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <RequireAuth employerOnly={true}>
                <ListingForm />
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
