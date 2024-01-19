import React, { useState ,useEffect } from "react";
import CustomNavbar from "./LandingPage/Navbar";
import logo from "./img/translator.png";
import { useNavigate } from "react-router-dom";

const SelectLanguage = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
  };

  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8000/languages`)
      .then((response) => response.json())
      .then((data) => {
        setLanguages(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleStartLearning = () => {
    navigate(`/LanguageProfile/${selectedLanguage}`)
  }

  return (
    <>
      <CustomNavbar />
      <div className="select-language-container">
        <div className="img-logo-container">
          <img src={logo}></img>
        </div>
        <h1>Select Your Language</h1>
        <div className="language-list">
          {languages.map((language) => (
            <div
              key={language.id}
              className={`language-item ${
                selectedLanguage === language.name ? "selected-language" : ""
              }`}
              onClick={() => handleLanguageSelect(language)}
            >
              {language.name}
            </div>
          ))}
        </div>
        {selectedLanguage ? (
          <button className="start-learning-btn" onClick={handleStartLearning}>Start Learning</button>
        ) : (
          <button className="disabled-learning-btn" disabled>
            Start Learning
          </button>
        )}
      </div>
    </>
  );
};

export default SelectLanguage;
