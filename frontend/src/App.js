import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/LandingPage/Home";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import RegistrationForm from "./components/Register";
import SelectLanguage from "./components/SelectLanguage";
import LanguageProfile from "./components/LanguageProfile";
import Learning from "./components/Learning";
import Dashboard from "./components/DashBoard/Dashboard";
import Users from "./components/DashBoard/DUsers";
import Courses from "./components/DashBoard/DLanguages";
import AddLanguage from "./components/DashBoard/AddLanguage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />}></Route>
          <Route path="/register" element={<RegistrationForm />}></Route>
          <Route
            path="/user-profile"
            element={<UserProfile user={user} />}
          ></Route>
          <Route
            path="/LanguageProfile/:language"
            element={<LanguageProfile />}
          ></Route>
          <Route path="/Learning/:language" element={<Learning />}></Route>
          <Route path="/select" element={<SelectLanguage />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/Dusers" element={<Users />}></Route>
          <Route path="/DLanguages" element={<Courses />}></Route>
          <Route path="/addlanguage" element={<AddLanguage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
