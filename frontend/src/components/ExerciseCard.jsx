import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const QuestionCard = ({ question, showAnswer, onShowAnswer, onOptionSelect, selectedOption }) => (
  <div className="question-container">
    <h3>{question.question}</h3>
    <form>
      {question.options.map((option, index) => (
        <label key={index} className="option-label">
          <input
            type="radio"
            value={index}
            checked={selectedOption === index}
            onChange={() => onOptionSelect(index)}
          />
          {option}
        </label>
      ))}
    </form>
    {showAnswer && (
      <p className={selectedOption === question.correctOption ? 'correct' : 'incorrect'}>
        {selectedOption === question.correctOption ? 'Correct!' : 'Wrong!'}
      </p>
    )}
    <button onClick={onShowAnswer} className="show-answer-btn">
      Show Answer
    </button>
  </div>
);

const ExerciseCard = ({ exercise, onNextClick, onPrevClick , len , idx , onFinish}) => {
  const [showAnswers, setShowAnswers] = useState(Array(exercise.questions.length).fill(false));
  const [selectedOptions, setSelectedOptions] = useState(Array(exercise.questions.length).fill(null));

  const handleShowAnswer = (index) => {
    setShowAnswers((prevShowAnswers) => {
      const newShowAnswers = [...prevShowAnswers];
      newShowAnswers[index] = true;
      return newShowAnswers;
    });
  };

  const handleOptionSelect = (index, selectedOption) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[index] = selectedOption;
      return newSelectedOptions;
    });
  };

  return (
    <div className="exercise-card">
      <h2>{exercise.title}</h2>
      {exercise.questions && exercise.questions.length > 0 ? (
        exercise.questions.map((question, index) => (
          <QuestionCard
            key={question._id}
            question={question}
            showAnswer={showAnswers[index]}
            onShowAnswer={() => handleShowAnswer(index)}
            onOptionSelect={(selectedOption) => handleOptionSelect(index, selectedOption)}
            selectedOption={selectedOptions[index]}
          />
        ))
      ) : (
        <p>No questions available for this exercise.</p>
      )}
      <div className="nav-buttons">
          {idx > 0 ? (
            <button className="nav-button" onClick={onPrevClick}>
              <FontAwesomeIcon icon={faChevronLeft} /> Previous
            </button>
          ):<button></button>}
          {idx < len - 1 ? (
            <button className="nav-button" onClick={onNextClick}>
              Next <FontAwesomeIcon icon={faChevronRight} />
            </button>
          ):<button className="nav-button" onClick={onFinish}>
              Finish Learning <FontAwesomeIcon icon={faChevronRight} />
            </button>}
        </div>
    </div>
  );
};

export default ExerciseCard;
