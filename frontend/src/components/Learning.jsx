import React from "react";
import CustomNavbar from "./LandingPage/Navbar";
import { useLocation } from "react-router-dom";

const Learning = () => {
  const { pathname } = useLocation();
  const language = pathname.split("/").pop();
  const name = localStorage.getItem("name");
  return (
    <div>
      <CustomNavbar />
    </div>
  );
};

export default Learning;
