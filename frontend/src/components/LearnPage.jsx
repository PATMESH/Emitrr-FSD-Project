import React, { useState, useEffect } from 'react';
import CustomNavbar from './LandingPage/Navbar';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExerciseCard from './ExerciseCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const LearnPage = () => {
  const { pathname } = useLocation();
  const email = localStorage.getItem('email');
  const language = pathname.split('/').pop();
  const navigate = useNavigate();
  const [user , setUser] = useState(null);

  const [languageInfo, setLanguageInfo] = useState({
    name: '',
    exercises: [],
    completedExercises: 0,
  });

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);


  const updateLearningProgress = async (language, completedExercises, progress) => {
    try {
      const response = await axios.put(`http://localhost:8000/update-learning/${email}`, {
        language,
        exercisesCompleted : completedExercises,
        progress,
      });

      if (response.data) {
        console.log('Learning progress updated successfully:', response.data);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error updating learning progress:', error);
    }
  };

  useEffect(() => {
    if (currentExerciseIndex > languageInfo.completedExercises) {
      setLanguageInfo((prevLanguageInfo) => ({
        ...prevLanguageInfo,
        completedExercises: currentExerciseIndex,
      }));
      const progress = (currentExerciseIndex / languageInfo.exercises.length) * 100;
      const { name, completedExercises } = languageInfo;
      updateLearningProgress(name, currentExerciseIndex, progress);
    }
  }, [currentExerciseIndex]);

  useEffect(() => {
    const fetchLanguageInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/language/${language}`);

        if (response.data) {
          const { name, exercises , totalExercises } = response.data;
          setLanguageInfo({
            name,
            exercises,
            totalExercises,
            completedExercises: 0,
          });
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching language information:', error);
      }
    };

    fetchLanguageInfo();
  }, [language]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${email}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [email]);

  useEffect(() => {
    if (user && user.learnings) {
      const learningData = user.learnings.find((learning) => learning.name === language);
      if (learningData) {
        setLanguageInfo((prevLanguageInfo) => ({
          ...prevLanguageInfo,
          completedExercises: learningData.exercisesCompleted || 0,
        }));
      }
    }
  }, [user, language]);

  const handleNextClick = () => {
    if (currentExerciseIndex < languageInfo.exercises.length - 1) {
      setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prevIndex) => prevIndex - 1);
    }
  };

  const onFinish = async()=>{
    const response = await axios.put(`http://localhost:8000/update-learning/${email}`, {
        language,
        exercisesCompleted : languageInfo.exercises.length,
        progress:100,
      });
      navigate("/mylearnings")
  }

  return (
    <div>
      <CustomNavbar />
      <div>
        <div style={{display:'flex' , justifyContent:'space-between' , padding:' 10px 30px'}}>
        <div><h1>{languageInfo.name} Learning</h1></div>
        <div><button className='quit-btn' style={{}}>Quit Learning...</button></div>
        </div>
        <p style={{padding:'10px 30px'}}>Completed Exercises: {languageInfo.completedExercises}</p>
        {languageInfo.exercises.length > 0 ? (
          <ExerciseCard
            exercise={languageInfo.exercises[currentExerciseIndex]}
            onNextClick={handleNextClick}
            onPrevClick={handlePrevClick}
            len={languageInfo.exercises.length}
            idx = {currentExerciseIndex}
            onFinish = {onFinish}
          />
        ) : (
          <p>No exercises available.</p>
        )}
      </div>
    </div>
  );
};

export default LearnPage;
