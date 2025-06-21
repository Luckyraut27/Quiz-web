import React, { useState, useRef } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];
  const question = data[index]; 

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("Correct");
        setScore(prev => prev + 1); // Increase score
      } else {
        e.target.classList.add("Wrong");
        option_array[question.ans - 1].current.classList.add("Correct");
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
      } else {
        setShowResult(true);
      }
    } else {
      alert("Please select an option first!");
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setShowResult(false);
  };

  return (
    <div className='Container'>
      <h1>Quiz-App</h1>
      <hr />

      {showResult ? (
        <div className="result">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} out of {data.length}</p>
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
          <button className='btn btn-success' onClick={nextQuestion}>Next</button>
          <div className="index">{index + 1} of {data.length} questions</div>
          <div className="score">Current Score: {score}</div>
        </>
      )}
    </div>
  );
}

export default Quiz;
