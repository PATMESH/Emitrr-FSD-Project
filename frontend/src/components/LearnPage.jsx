import React, { useState, useEffect } from 'react';
import CustomNavbar from './LandingPage/Navbar';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExerciseCard from './ExerciseCard';

const LearnPage = () => {
  const { pathname } = useLocation();
  const email = localStorage.getItem('email');
  const language = pathname.split('/').pop();
  const navigate = useNavigate();

  const [languageInfo, setLanguageInfo] = useState({
    name: '',
    exercises: [],
    completedExercises: 0,
  });

  useEffect(() => {
    const fetchLanguageInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/language/${language}`);
        
        if (response.data) {
          setLanguageInfo({
            name: response.data.name,
            exercises: response.data.exercises,
            completedExercises: 0,
          }
          );
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching language information:', error);
      }
    };
  
    fetchLanguageInfo();
  }, [language]);



  const handleExerciseCompletion = (exerciseId) => {
    setLanguageInfo((prevLanguageInfo) => ({
      ...prevLanguageInfo,
      completedExercises: prevLanguageInfo.completedExercises + 1,
    }));
  };

  return (
    <div>
      <CustomNavbar />
      <div>
        <h1>{languageInfo.name} Learning</h1>
        <div>
          {languageInfo.exercises && languageInfo.exercises.length > 0 ? (
            languageInfo.exercises.map((exercise) => (
              <ExerciseCard key={exercise._id} question={exercise} />
            ))
          ) : (
            <p>No exercises available. comming soon....</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
