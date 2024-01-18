import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/LandingPage/Home";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import LanguageDetails from "./components/LanguageDetails";
import RegistrationForm from "./components/Register";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />}></Route>
          <Route path="/register" element={<RegistrationForm/>}></Route>
          <Route
            path="/user-profile"
            element={<UserProfile user={user} />}
          ></Route>
          <Route path="/language/:id" element={<LanguageDetails />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
