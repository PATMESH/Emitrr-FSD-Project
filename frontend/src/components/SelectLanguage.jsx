import React from 'react';
import CustomNavbar from './LandingPage/Navbar';

const languages = [
  { id: 1, name: 'English' },
  { id: 2, name: 'French' },
  { id: 3, name: 'German' },
];

const SelectLanguage = () => {
  const handleLanguageSelect = (language) => {
    console.log(`Selected language: ${language.name}`);
  };

  return (
    <>
      <CustomNavbar />
      <div className="select-language-container">
        <h1>Select Your Language</h1>
        <div className="language-list">
          {languages.map((language) => (
            <div
              key={language.id}
              className="language-item"
              onClick={() => handleLanguageSelect(language)}
            >
              {language.name}
            </div>
          ))}
        </div>
        <button className="start-learning-btn">Start Learning</button>
      </div>
    </>
  );
};

export default SelectLanguage;
