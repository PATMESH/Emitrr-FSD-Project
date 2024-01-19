import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditLanguage = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [languageData, setLanguageData] = useState({
    name: "",
    details: "",
    difficultyLevel: "",
    commonlySpoken: "",
    script: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLanguageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/languageId/${id}`);
        const languageDetails = response.data;
        setLanguageData({
          name: languageDetails.name,
          details: languageDetails.details,
          difficultyLevel: languageDetails.difficultyLevel,
          commonlySpoken: languageDetails.commonlySpoken,
          script: languageDetails.script,
        });
      } catch (error) {
        setError("Error fetching language details");
      }
    };
  
    fetchLanguageDetails(); 
  }, [id]);
  

  const handleChange = (e) => {
    setLanguageData({
      ...languageData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/language/${id}`, languageData);
      console.log(response.data);
      setError("");
      navigate("/dLanguages");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="add-language-form">
      <h2 className="add-language-title">Edit Language</h2>
      <form onSubmit={handleSubmit} className="language-form">
      <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={languageData.name}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="details" className="form-label">
          Details:
        </label>
        <textarea
          id="details"
          name="details"
          value={languageData.details}
          onChange={handleChange}
          required
          className="form-input form-textarea"
        />

        <label htmlFor="difficultyLevel" className="form-label">
          Difficulty Level:
        </label>
        <select
          id="difficultyLevel"
          name="difficultyLevel"
          value={languageData.difficultyLevel}
          onChange={handleChange}
          required
          className="form-input"
        >
          <option value="">Select Difficulty Level</option>
          <option value="easy">Easy</option>
          <option value="Intermediate">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label htmlFor="commonlySpoken" className="form-label">
          Commonly Spoken:
        </label>
        <input
          type="text"
          id="commonlySpoken"
          name="commonlySpoken"
          value={languageData.commonlySpoken}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="script" className="form-label">
          Script:
        </label>
        <input
          type="text"
          id="script"
          name="script"
          value={languageData.script}
          onChange={handleChange}
          required
          className="form-input"
        />

        <button type="submit" className="form-button">
          Update
        </button>

        {error && <p className="form-error-message">{error}</p>}
      </form>
    </div>
  );
};

export default EditLanguage;
