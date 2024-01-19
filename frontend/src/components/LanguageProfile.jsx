import React from 'react';
import CustomNavbar from './LandingPage/Navbar';
import { useLocation } from 'react-router-dom';
import { Progress } from 'antd';
import { useNavigate } from 'react-router-dom';

const LanguageProfile = () => {
  const { pathname } = useLocation();
  const language = pathname.split('/').pop();
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const languageInfo = {
    name: language,
    about: "A beautiful language to learn and explore. Dive into the rich culture and history. This language is known for its melodious sounds and expressive vocabulary.",
    totalExercises: 90,
    completedExercises: 80,
    remainingExercises: 90 - 80,
    progress: (90 / 80) * 100,
    topUserPerformances: [
      { username: 'John', score: 90, icon: '🥇' },
      { username: 'Danny', score: 85, icon: '🥈' },
      { username: 'Arjun', score: 80, icon: '🥉' },
      { username: 'Kelly', score: 75, icon: '🏅' },
      { username: 'Hitman', score: 70, icon: '🏅' },
    ],
    additionalInfo: [
      { label: 'Difficulty Level', value: 'Intermediate' },
      { label: 'Commonly Spoken', value: 'In many regions' },
      { label: 'Script', value: 'Latin alphabet' },
    ],
  };

  const handleStart=()=>{
    navigate(`/learning/${language}`)
  }

  return (
    <>
      <CustomNavbar />
      <div className="language-profile-container">
        <div className="language-header">
          <div className="language-title">
            <h1>{languageInfo.name} Language Profile</h1>
            <p>{languageInfo.about}</p>
            <ul className="additional-info-list">
              {languageInfo.additionalInfo.map((info, index) => (
                <li key={index}>
                  <strong>{info.label}:</strong> {info.value}
                </li>
              ))}
            </ul>
          </div>
          <div className="top-scorers">
            <h2>Top Learners</h2>
            <ul>
              {languageInfo.topUserPerformances.map((user, index) => (
                <li key={index}>
                  {user.icon} {user.username}: {user.score}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="language-info">
          <div className='lang-details'>
            <p>Total Exercises: {languageInfo.totalExercises}</p>
            <p>Completed Exercises: {languageInfo.completedExercises}</p>
            <p>Remaining Exercises: {languageInfo.remainingExercises}</p>
          </div>
          <div className="progress-section">
            <h3 className="section-title">Progress</h3>
            <Progress
              percent={Math.ceil((languageInfo.completedExercises / languageInfo.totalExercises) * 100)}
              status="active"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              showInfo={false}
            />
          </div>
        </div>
        <div className="start-learning">
          <button className="start-btn" onClick={handleStart}>{languageInfo.completedExercises>0 ? "continue Learning" : "Start Learning"}</button>
        </div>
      </div>
    </>
  );
};

export default LanguageProfile;
