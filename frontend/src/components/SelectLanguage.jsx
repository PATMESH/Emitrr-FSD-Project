import React, { useState } from "react";
import CustomNavbar from "./LandingPage/Navbar";
import logo from "./img/translator.png";

const SelectLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const languages = [
    { id: 1, name: "English" },
    { id: 2, name: "French" },
    { id: 3, name: "German" },
    { id: 4, name: "Spanish" },
    { id: 5, name: "Italian" },
    { id: 6, name: "Japanese" },
    { id: 7, name: "Chinese" },
    { id: 8, name: "Russian" },
    { id: 9, name: "Arabic" },
    { id: 10, name: "Portuguese" },
    { id: 11, name: "Dutch" },
    { id: 12, name: "Korean" },
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
  };

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
          <button
            className="start-learning-btn"
            onClick={() =>
              console.log(`Start learning ${selectedLanguage.name}`)
            }
          >
            Start Learning
          </button>
        ) : (
          <button className="disabled-learning-btn" disabled>
            Select a Language
          </button>
        )}
      </div>
    </>
  );
};

export default SelectLanguage;
