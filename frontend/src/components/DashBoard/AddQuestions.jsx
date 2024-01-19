import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddQuestions = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exerciseData, setExerciseData] = useState({
    title: "",
    question: "",
    options: ["", "", "", ""],
    correctOption: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({
      ...exerciseData,
      [name]: value,
    });
  };

  const handleOptionsChange = (index, value) => {
    setExerciseData((prevData) => {
      const updatedOptions = [...prevData.options];
      updatedOptions[index] = value;
      return {
        ...prevData,
        options: updatedOptions,
      };
    });
  };

  const handleCorrectOptionChange = (index) => {
    setExerciseData((prevData) => ({
      ...prevData,
      correctOption: index,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://language-learning-game-z20w.onrender.com/language/${id}/exercises`, exerciseData);
      console.log(response.data);
      setExerciseData({
        title: "",
        question: "",
        options: ["", "", "", ""],
        correctOption: 0,
      });
      navigate(`/dLanguages`);
    } catch (error) {
      console.error("Error submitting exercise:", error);
    }
  };

  return (
    <div className="add-language-form">
      <h2 className="add-language-title">Add Exercise</h2>
      <form onSubmit={handleSubmit} className="language-form">
        <label htmlFor="title" className="form-label">
          Exercise Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={exerciseData.title}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="question" className="form-label">
          Exercise Question:
        </label>
        <textarea
          id="question"
          name="question"
          value={exerciseData.question}
          onChange={handleChange}
          required
          className="form-input form-textarea"
        ></textarea>

        <label>Options:</label>
        {exerciseData.options.map((option, index) => (
          <div key={index} style={{display:'flex',alignItems:'center    ',justifyContent:'space-around',margin:'10px'}}>
            <input
              type="text"
              value={option}
              style={{width:"70%"}}
              onChange={(e) => handleOptionsChange(index, e.target.value)}
              required
            />
            <label>
              <input
                type="radio"
                name="correctOption"
                checked={exerciseData.correctOption === index}
                onChange={() => handleCorrectOptionChange(index)}
              />
              Correct
            </label>
          </div>
        ))}

        <button type="submit" className="form-button">
          Submit Exercise
        </button>
      </form>
    </div>
  );
};

export default AddQuestions;
