import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import SummaryScreen from './components/SummaryScreen';
import ThemeToggle from './components/ThemeToggle';
import { questions } from './data/questions';
import { AppIdea } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'questions' | 'summary'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [appIdea, setAppIdea] = useState<AppIdea>({});
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleStart = () => {
    setCurrentScreen('questions');
  };

  const handleNext = (id: string, answer: string) => {
    // Save the answer
    setAppIdea(prev => ({
      ...prev,
      [id]: answer
    }));

    // Move to next question or summary
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentScreen('summary');
    }
  };

  const handleSkip = () => {
    // Move to next question without saving an answer
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentScreen('summary');
    }
  };

  const handleRestart = () => {
    setAppIdea({});
    setCurrentQuestionIndex(0);
    setCurrentScreen('start');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {currentScreen === 'start' && (
        <StartScreen onStart={handleStart} />
      )}
      
      {currentScreen === 'questions' && (
        <QuestionScreen
          question={questions[currentQuestionIndex]}
          currentStep={currentQuestionIndex + 1}
          totalSteps={questions.length}
          appIdea={appIdea}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      )}
      
      {currentScreen === 'summary' && (
        <SummaryScreen appIdea={appIdea} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
