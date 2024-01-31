import React, { useState } from 'react'
import EnglishData from '../EnglishData.js'
import './Words.css'

/*This app checks if the entries in English are right for basic words and the sentences that those basic words form right after the basic words quiz. Final score will be shown after the quiz*/

const Words = () => {    
    //Go through the rendered markup and look for the states that needs to be updated
    //States: Telugu word, English word, Score update 

    const [tel, setTel] = useState(0);
    const [score, setScore] = useState(null);

    const [inputAnswer, setInputAnswer] = useState("");
    const[showResult, setShowResult] = useState(false);
    
    const { telugu, english} = EnglishData.questions[tel];

    //submit handler, Score increment handler, final score handler, conditional rendering to show final score board

    const onClickNext = () => {
      
      const userAnswer = inputAnswer.toLowerCase(); // Ignore case for comparison
      const correctAnswer = english.toLowerCase();
      if (userAnswer === correctAnswer) {
        setScore((prev) => prev + 1);
      }else{
        setScore((prev) => prev);
      }
  
      if (tel !== EnglishData.questions.length - 1) {
        setTel((prev) => prev + 1);
      } else {
        setTel(0);
        setShowResult(true);
      }
      
      setInputAnswer("");
    };
    
    console.log(score)

    const onTryAgain = () => {
      setScore(0);
      setShowResult(false);
      setInputAnswer("");
    };

    const handleInputChange = (evt) => {
      setInputAnswer(evt.target.value);
    };

  return (
    <div className="words">
      <div className='container'>
      <h2>Words and Sentences</h2>
        {!showResult ? (
            <>
              <p>ఈ పదానికి English లో అర్ధం ఏంటి ?</p>
              <h3>"{telugu}"</h3>
              <p><input value={inputAnswer} onChange={handleInputChange}/></p>
              <button onClick={onClickNext}>{tel === EnglishData.questions.length - 1 ? "Finish" : "Next"}</button>
            </>
          ) : (
            <>
            <p>Your final score is: {score} out of {EnglishData.questions.length}</p>
            <button onClick={onTryAgain}>Try again</button>
            </>
          )}    
          </div> 
    </div>
  )
}


export default Words

