import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/LandingPage/Home";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import RegistrationForm from "./components/Register";
import SelectLanguage from "./components/SelectLanguage";
import LanguageProfile from "./components/LanguageProfile";
import Learnings from "./components/Learnings";
import Dashboard from "./components/DashBoard/Dashboard";
import Users from "./components/DashBoard/DUsers";
import Courses from "./components/DashBoard/DLanguages";
import AddLanguage from "./components/DashBoard/AddLanguage";
import Profile from "./components/profile";
import LearnPage from "./components/LearnPage";
import AddQuestions from "./components/DashBoard/AddQuestions";
import EditLanguage from "./components/DashBoard/EditLanguage";

function App() {

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
          <Route
            path="/learn/:language"
            element={<LearnPage />}
          ></Route>
          <Route path="/mylearnings" element={<Learnings />}></Route>
          <Route path="/select" element={<SelectLanguage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/Dusers" element={<Users />}></Route>
          <Route path="/DLanguages" element={<Courses />}></Route>
          <Route path="/addlanguage" element={<AddLanguage />}></Route>
          <Route path="/addquestions/:id" element={<AddQuestions />}></Route>
          <Route path="/editLanguage/:id" element={<EditLanguage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
