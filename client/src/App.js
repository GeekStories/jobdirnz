import "./styles/App.css";

import SingleListing from "./Components/SingleListing/singleListing";
import RequireAuth from "./Components/Auth/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Contact from "./Views/Contact";
import Account from "./Views/Account";
import PostJob from "./Views/PostJob";
import SignUp from "./Views/SignUp";
import Header from "./Views/Header";
import About from "./Views/About";
import Home from "./Views/Home";
import Login from "./Views/Login";

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
          <Route path="/employer" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route
            path="/account"
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          />

          <Route
            path="/create"
            element={
              <RequireAuth>
                <PostJob />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
