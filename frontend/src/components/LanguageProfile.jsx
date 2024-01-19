import React, { useState, useEffect } from 'react';
import CustomNavbar from './LandingPage/Navbar';
import { useLocation } from 'react-router-dom';
import { Progress } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LanguageProfile = () => {
  const { pathname } = useLocation();
  const email = localStorage.getItem('email');
  const language = pathname.split('/').pop();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [languageInfo, setLanguageInfo] = useState({
    name: language,
    about: '',
    totalExercises: 0,
    completedExercises: 0,
    remainingExercises: 0,
    progress: 0,
    additionalInfo: [],
    topUserPerformances: [
      { username: 'John', score: 90, icon: '🥇' },
      { username: 'Danny', score: 85, icon: '🥈' },
      { username: 'Arjun', score: 80, icon: '🥉' },
      { username: 'Kelly', score: 75, icon: '🏅' },
      { username: 'Hitman', score: 70, icon: '🏅' },
    ],
  });

  const handleStart = () => {
    navigate(`/learn/${language}`);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://language-learning-game-z20w.onrender.com/user/${email}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchLanguageInfo = async () => {
      try {
        const response = await axios.get(`https://language-learning-game-z20w.onrender.com/language/${language}`);
        const { details, difficultyLevel, commonlySpoken, script, exercises } = response.data;
        setLanguageInfo((prevLanguageInfo) => ({
          ...prevLanguageInfo,
          about: details,
          totalExercises: exercises.length,
          additionalInfo: [
            { label: 'Difficulty Level', value: difficultyLevel },
            { label: 'Commonly Spoken', value: commonlySpoken },
            { label: 'Script', value: script },
          ],
        }));
      } catch (error) {
        console.error('Error fetching language information:', error);
      }
    };

    fetchUserDetails();
    fetchLanguageInfo();
  }, [email, language]);

  useEffect(() => {
    const languageLearning = user.learnings && user.learnings.find((learning) => learning.name === languageInfo.name);
    if (languageLearning) {
      setLanguageInfo((prevLanguageInfo) => ({
        ...prevLanguageInfo,
        completedExercises: languageLearning.exercisesCompleted,
        remainingExercises: prevLanguageInfo.totalExercises - languageLearning.exercisesCompleted,
        progress: Math.ceil((languageLearning.exercisesCompleted / prevLanguageInfo.totalExercises) * 100),
      }));
    }
  }, [languageInfo.name, user.learnings]);

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
          <div className="lang-details">
            <p>Total Exercises: {languageInfo.totalExercises}</p>
            <p>Completed Exercises: {languageInfo.completedExercises}</p>
            <p>Remaining Exercises: {languageInfo.remainingExercises}</p>
          </div>
          <div className="progress-section">
            <h3 className="section-title">Progress</h3>
            {languageInfo.progress&&languageInfo.progress}% completed
            <Progress
              percent={languageInfo.progress}
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
          <button className="start-btn" onClick={handleStart}>
            {languageInfo.completedExercises > 0 ? 'continue Learning' : 'Start Learning'}
          </button>
        </div>
      </div>
    </>
  );
};

export default LanguageProfile;