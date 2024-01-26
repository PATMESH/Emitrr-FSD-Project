import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const QuestionCard = ({ question, showAnswer, onOptionSelect, selectedOption }) => (
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
    {showAnswer ? (
      <p className={selectedOption === question.correctOption ? 'correct' : 'incorrect'}>
        {selectedOption === question.correctOption ? 'Correct!' : 'Wrong!'}
      </p>
    ) : <br></br>}
  </div>
);

const ExerciseCard = ({ exercise, onNextClick, onPrevClick , len , idx , onFinish}) => {

  const [showAnswers, setShowAnswers] = useState(Array(exercise.questions.length).fill(false));
  const [selectedOptions, setSelectedOptions] = useState(Array(exercise.questions.length).fill(null));
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(()=>{
    setShowAnswers(Array(exercise.questions.length).fill(false));
    setSelectedOptions(Array(exercise.questions.length).fill(null));
    setCorrectCount(0);
  },[exercise]);

  const handleOptionSelect = (index, selectedOption) => {
    setShowAnswers(Array(exercise.questions.length).fill(false));
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = [...prevSelectedOptions];
      newSelectedOptions[index] = selectedOption;
      return newSelectedOptions;
    });
  };

  const checkAnswers = () =>{
    const count = selectedOptions.filter((selectedOption, index) => selectedOption === exercise.questions[index].correctOption).length;
    setCorrectCount(count);
    setShowAnswers(Array(exercise.questions.length).fill(true));
  }

  return (
    <div className="exercise-card">
      <h2>{exercise.title}</h2>
      {exercise.questions && exercise.questions.length > 0 ? (
        exercise.questions.map((question, index) => (
          <QuestionCard
            key={question._id}
            question={question}
            showAnswer={showAnswers[index]}
            onOptionSelect={(selectedOption) => handleOptionSelect(index, selectedOption)}
            selectedOption={selectedOptions[index]}
          />
        ))
      ) : (
        <p>No questions available for this exercise.</p>
      )}
      <button className="show-answer-btn" onClick={checkAnswers}>Check Answers</button>
      <div className="nav-buttons">
          {idx > 0 ? (
            <button className="nav-button" onClick={onPrevClick}>
              <FontAwesomeIcon icon={faChevronLeft} /> Previous
            </button>
          ):<button></button>}
          {idx < len - 1 ? (
            <button className={`${correctCount === exercise.questions.length ? 'nav-button' : 'disabled-nav-btn'}`} onClick={onNextClick} disabled={!(correctCount===exercise.questions.length)}>
              Next <FontAwesomeIcon icon={faChevronRight} />
            </button>
          ):<button className={`${correctCount === exercise.questions.length ? 'nav-button' : 'disabled-nav-btn'}`} onClick={onFinish} disabled={!(correctCount===exercise.questions.length)}>
              Finish Learning <FontAwesomeIcon icon={faChevronRight} />
            </button>}
        </div>
    </div>
  );
};

export default ExerciseCard;
