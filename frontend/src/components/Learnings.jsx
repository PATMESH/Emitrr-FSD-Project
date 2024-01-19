import React, { useState, useEffect } from "react";
import CustomNavbar from "./LandingPage/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

const Learning = () => {
  const { pathname } = useLocation();
  const language = pathname.split("/").pop();
  const id = localStorage.getItem("email");
  const [userLanguages, setUserLanguages] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userResponse = await fetch(`http://localhost:8000/user/${id}`);
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user details.");
        }
        const userData = await userResponse.json();
        setUserLanguages(userData.learnings);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    async function fetchAllLanguages() {
      try {
        const languagesResponse = await fetch(`http://localhost:8000/languages`);
        if (!languagesResponse.ok) {
          throw new Error("Failed to fetch all languages.");
        }
        const languagesData = await languagesResponse.json();
        setAllLanguages(languagesData);
      } catch (error) {
        console.error("Error fetching all languages:", error);
      }
    }

    fetchUserDetails();
    fetchAllLanguages();
  }, [id]);

  useEffect(() => {
    const updatedUserLanguages = userLanguages.map((userLanguage) => {
      const languageDetails = allLanguages.find((lang) => lang.name === userLanguage.name);
      if (languageDetails) {
        return {
          ...userLanguage,
          totalExercises: languageDetails.exercises.length,
          completedExercises: userLanguage.exercisesCompleted,
        };
      }
      return userLanguage;
    });

    setUserLanguages(updatedUserLanguages);
  }, [allLanguages]);

  return (
    <div>
      <CustomNavbar />
      <div className="my-learnings-container">
        <div className="btn1 learn-new-lang">
          <h3>My Learning Languages</h3>
          <button onClick={() => navigate("/select")}>Learn new Language</button>
        </div>
        <ul className="language-learning-list">
          {userLanguages?.map((learning, index) => (
            <li key={index} className="lang-learn">
              <p className="language-name">{learning.name}</p>
              <p>Progress: {learning.progress}</p>
              <p>Exercises Completed: {learning.exercisesCompleted}</p>
              <p>Total Exercises: {learning.totalExercises}</p>
              <button
                className="start-btn"
                style={{ padding: "4px 8px" }}
                onClick={() => navigate(`/LanguageProfile/${learning.name}`)}
              >
                Start
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Learning;
