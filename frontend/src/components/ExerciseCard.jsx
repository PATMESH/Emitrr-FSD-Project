import React, { useState } from 'react';

const ExerciseCard = ({ exercise }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  console.log("exercise");
  console.log(exercise);

  return (
    <div className="exercise-card">
      <h2>{exercise.title}</h2>
      {exercise.questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                className={selectedOption === optionIndex ? 'selected-option' : ''}
                onClick={() => handleOptionSelect(optionIndex)}
              >
                {option}
              </li>
            ))}
          </ul>
          <button onClick={handleShowAnswer}>Show Answer</button>
          {showAnswer && (
            <p className={selectedOption === question.correctOption ? 'correct-answer' : 'wrong-answer'}>
              Correct Option: {question.options[question.correctOption]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExerciseCard;
