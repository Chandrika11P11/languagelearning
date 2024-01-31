import React, { useRef, useState, useEffect } from 'react'
import gsap from "gsap";
import './MultiChoice.css'

const questions = [
    {
      id: 0,
      text: "What does CSS stand for?",
      answers: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style Sheets",
        "Colorful Style Sheets"
      ],
      correct: 1,
      selection: null
    },
    {
      id: 1,
      text:
        "The property in CSS used to change the background color of an element is?",
      answers: ["bgcolor", "color", "background-color", "All of the above"],
      correct: 2,
      selection: null
    },
    {
      id: 2,
      text: "The property in CSS used to change the text color of an element is?",
      answers: ["bgcolor", "color", "background-color", "All of the above"],
      correct: 1,
      selection: null
    },
    {
      id: 3,
      text: "The CSS property used to control the element's font size is?",
      answers: ["text-style", "font-style", "text-size", "font-size"],
      correct: 3,
      selection: null
    },
    {
      id: 4,
      text: "The HTML attribute used to define the inline styles is?",
      answers: ["style", "inline", "class", "None of the above"],
      correct: 0,
      selection: null
    },
    {
      id: 5,
      text: "Are the negative values allowed in padding property?",
      answers: ["Yes", "No", "It depends on HTML", "None of the above"],
      correct: 1,
      selection: null
    },
    {
      id: 6,
      text:
        "The CSS property used to specify whether the text is written in the horizontal or vertical direction?",
      answers: ["word-break", "text-transform", "writing-mode", "text-direction"],
      correct: 2,
      selection: null
    },
    {
      id: 7,
      text: "Which selector is used to specify a style for one unique element?",
      answers: ["class", "attribute", "text", "id"],
      correct: 3,
      selection: null
    },
    {
      id: 8,
      text:
        "Which of the following is the correct syntax to select the p siblings of a div element?",
      answers: ["p", "div + p", "div p", "div ~ p"],
      correct: 3,
      selection: null
    },
    {
      id: 9,
      text: "How can you add a comment in a CSS file?",
      answers: [
        "/* this is a comment */",
        "// this is a comment",
        "<!-- this is a comment -->",
        "** this is a comment **"
      ],
      correct: 0,
      selection: null
    }
  ];


function useCounter(initialState) {
  const [value, setValue] = useState(initialState);
  const reset = () => setValue(0);

  const add = () => setValue((value) => (value += 1));

  return { value, add, reset };
}

function Question({
  data,
  buttonText,
  hasButton = true,
  onQuestionButtonClick,
  showAnswer = false,
  markSelection = null
}) {
  const [answer, setAnswer] = useState(null);
  const parseValue = (value) => (value ? parseInt(value.split("-")[1]) : null);
  const questionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      questionRef.current.querySelector(".question-text"),
      {
        x: 40,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.4
      }
    );
    gsap.fromTo(
      questionRef.current.querySelectorAll("li"),
      {
        opacity: 0,
        x: 40
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1
      }
    );
  }, [data]);

  return (
    <div className="question" ref={questionRef}>
      <div className="question-inner">
        <h2 className="question-text">{data.text}</h2>
        <ul className="question-answers">
          {data.answers.map((text, index) => {
            const value = `q${data.id}-${index}`;
            return (
              <li
                className={
                  index === data.correct && showAnswer ? "is-true" : ""
                }
                data-selected={markSelection === index ? true : null}
              >
                <input
                  type="radio"
                  name={`q_${data.id}`}
                  value={value}
                  id={value}
                  onChange={(e) => setAnswer(e.target.value)}
                  checked={
                    !showAnswer ? answer === value : markSelection === index
                  }
                />
                <label className="question-answer" htmlFor={value}>
                  {text}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      {hasButton && (
        <button
          className="question-button"
          onClick={() => onQuestionButtonClick(parseValue(answer), data)}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

function Results({ wrong, correct, empty }) {
  return (
    <div className="result">
      <div className="result-item is-correct">
        <span className="result-count">{correct}</span>
        <span className="result-text">
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="css-i6dzq1"
            viewBox="0 0 24 24"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01 9 11.01"></path>
          </svg>
          CORRECT
        </span>
      </div>
      <div className="result-item is-wrong">
        <span className="result-count">{wrong}</span>
        <span className="result-text">
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="css-i6dzq1"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M15 9L9 15"></path>
            <path d="M9 9L15 15"></path>
          </svg>
          WRONG
        </span>
      </div>
      <div className="result-item is-empty">
        <span className="result-count">{empty}</span>
        <span className="result-text">
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="css-i6dzq1"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 12L16 12"></path>
          </svg>
          EMPTY
        </span>
      </div>
    </div>
  );
}

function QuestionCorrection({ wrong, correct, empty }) {
  return (
    <div className="correction">
      {questions.map((question) => {
        return (
          <Question
            hasButton={false}
            markSelection={question.selection}
            showAnswer={true}
            data={question}
          />
        );
      })}
    </div>
  );
}

export default function MutliChoice() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameSize, setGameSize] = useState({});
  const totalQuestion = questions.length - 1;
  const gameRef = useRef(null);
  const gameOverlayRef = useRef(null);

  const question = useCounter(0);
  const correct = useCounter(0);
  const wrong = useCounter(0);
  const empty = useCounter(0);

  const handleNewQuestionClick = (selectedValue, currQuestion) => {
    if (totalQuestion >= question.value) {
      if (selectedValue === currQuestion.correct) {
        correct.add();
      } else if (
        selectedValue !== null &&
        selectedValue !== currQuestion.correct
      ) {
        wrong.add();
      } else {
        empty.add();
      }
      questions[currQuestion.id].selection = selectedValue;
      question.add();
    }
  };

  const resetSelection = () => {
    questions.forEach((q) => (q.selection = null));
  };

  const handleRestartClick = () => {
    setGameFinished(false);
    setGameStarted(false);
    resetSelection();
    question.reset();
    correct.reset();
    wrong.reset();
    empty.reset();
  };

  const indicatorBg = (index) => {
    if (question.value > index) {
      return "#fff";
    } else if (question.value === index) {
      return "#29b5d5";
    } else {
      return "rgba(255,255,255,.2)";
    }
  };

  useEffect(() => {
    if (gameStarted) {
      document.body.classList.add("game-started");
    } else {
      document.body.classList.remove("game-started");
    }
  }, [gameStarted]);

  useEffect(() => {
    if (question.value > totalQuestion) {
      gameRef.current.scrollTop = 0;
    }
  }, [question.value]);

  return (
    <div
      className="game"
      ref={gameRef}
      data-game-started={gameStarted ? true : null}
      data-game-finished={question.value > totalQuestion ? true : null}
    >
      <div className="intro">
        <div className="intro-inner">
          <h1 className="intro-title">CSS Quiz</h1>
          {!gameStarted && (
            <>
              <p className="intro-desc">
                {`The test contains ${questions.length} questions and there is no time limit.`}
              </p>

              <button
                className="intro-button"
                onClick={() => setGameStarted(true)}
              >
                Start Quiz
              </button>
            </>
          )}
          {gameStarted && (
            <div className="indicator">
              {questions.map((q, index) => {
                return (
                  <span
                    className="indicator-item"
                    style={{
                      backgroundColor: indicatorBg(index)
                    }}
                  />
                );
              })}
            </div>
          )}
          <Results
            wrong={wrong.value}
            correct={correct.value}
            empty={empty.value}
          />
          <button
            className="restart-button"
            onClick={() => handleRestartClick()}
          >
            Restart Quiz
          </button>
        </div>
      </div>
      <div className="game-area">
        {questions[question.value] && (
          <Question
            data={questions[question.value]}
            buttonText={
              question.value !== totalQuestion ? "Next Question" : "Finish Quiz"
            }
            onQuestionButtonClick={handleNewQuestionClick}
          />
        )}

        {!questions[question.value] && (
          <>
            <QuestionCorrection data={questions} />
          </>
        )}
      </div>
    </div>
  );
}
