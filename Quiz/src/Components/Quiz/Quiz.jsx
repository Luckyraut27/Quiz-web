import React, { useState, useRef, useEffect } from 'react';
import './Quiz.css';
import { data as quizData } from '../../assets/data';

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Quiz = () => {
  const [data, setData] = useState(shuffleArray(quizData));
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [timer, setTimer] = useState(10); // 10 seconds per question

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];
  const question = data[index]; 

  // Timer Effect
  useEffect(() => {
    if (!lock && !showResult) {
      const countdown = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            clearInterval(countdown);
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [index, lock, showResult]);

  const handleTimeout = () => {
    setWrongAnswers(prev => prev + 1);
    option_array[question.ans - 1].current.classList.add("Correct");
    setLock(true);
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("Correct");
        setScore(prev => prev + 1);
        setCorrectAnswers(prev => prev + 1);
      } else {
        e.target.classList.add("Wrong");
        option_array[question.ans - 1].current.classList.add("Correct");
        setWrongAnswers(prev => prev + 1);
      }
      setLock(true);
    }
  };

  const nextQuestion = () => {
    if (lock) {
      option_array.forEach(option => {
        option.current.classList.remove("Correct");
        option.current.classList.remove("Wrong");
      });

      if (index < data.length - 1) {
        setIndex(index + 1);
        setLock(false);
        setTimer(10); // reset timer
      } else {
        setShowResult(true);
      }
    } else {
      alert("Please select an option or wait for the timer!");
    }
  };

  const resetQuiz = () => {
    setData(shuffleArray(quizData)); // reshuffle
    setIndex(0);
    setScore(0);
    setLock(false);
    setShowResult(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTimer(10);
  };

  return (
    <div className='Container'>
      <h1>Quiz-Web</h1>
      <hr />

      {showResult ? (
        <div className="result">
          <h2>Quiz Completed!</h2>
          <p><strong>Total Questions:</strong> {data.length}</p>
          <p><strong>Correct Answers:</strong> {correctAnswers}</p>
          <p><strong>Wrong Answers:</strong> {wrongAnswers}</p>
          <p><strong>Final Score:</strong> {score} / {data.length}</p>
          <button className='btn btn-primary' onClick={resetQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <div className="timer">⏳ Time Left: {timer}s</div>
          <button className='btn btn-success' onClick={nextQuestion}>Next</button>
          <div className="index">{index + 1} of {data.length} questions</div>
          <div className="score">Current Score: {score}</div>
        </>
      )}
    </div>
  );
}

export default Quiz;
