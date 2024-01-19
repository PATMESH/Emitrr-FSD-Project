import React, { useState ,useEffect } from "react";
import CustomNavbar from "./LandingPage/Navbar";
import logo from "./img/translator.png";
import { useNavigate } from "react-router-dom";

const SelectLanguage = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const id = localStorage.getItem("email");
  const [userLearning, setUserLearning] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserLearning(data.learnings);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [id]);


  useEffect(()=>{
    if(userLearning.length>0){
      navigate("/mylearnings")
    }
  },[userLearning])

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
    if (selectedLanguage) {
      fetch(`http://localhost:8000/startLearning`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: id,
          selectedLanguage: selectedLanguage,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          navigate(`/LanguageProfile/${selectedLanguage}`);
        })
        .catch((error) => {
          console.error("Error sending data to backend:", error);
        });
    }
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
