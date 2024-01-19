import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLanguage = () => {
  const [languageData, setLanguageData] = useState({
    name: "",
    details: "",
    difficultyLevel: "",
    commonlySpoken: "",
    script: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLanguageData({
      ...languageData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/language", languageData);
      console.log(response.data);
      setLanguageData({
        name: "",
        details: "",
        difficultyLevel: "",
        commonlySpoken: "",
        script: "",
      });
      setError("");
      navigate("/dLanguages");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="add-language-form">
      <h2 className="add-language-title">Add Language</h2>
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
          Submit
        </button>

        {error && <p className="form-error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AddLanguage;
