import "./App.css";

import { Routes, Route } from "react-router-dom";

import Contact from "./Views/Main/Contact";
import Signup from "./Views/Main/Signup";
import Header from "./Views/Main/Header";
import About from "./Views/Main/About";
import Home from "./Views/Main/Home";

const App = () => {
  return (
      <div className="container">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </div>
      </div>
  );
};

export default App;
