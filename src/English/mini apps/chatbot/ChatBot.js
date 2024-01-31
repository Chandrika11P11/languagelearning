// ChatBot.js
import React, { useState } from 'react';
import styled from 'styled-components';
import './Conversation.css'
import right from './right.png'
import responseDataset from './responseData';
import BotResponse from './Response';



const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [language1, setLanguage1] = useState('english'); // Default language 1 is French
  const [language2, setLanguage2] = useState('telugu'); // Default language 2 is Spanish
  const [translations, setTranslations] = useState([]);

  /*
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };*/

  const handleUserInput = (selectedInput) => {
    setUserInput(selectedInput);
  };
  /*
  const handleSendMessage = (e) => {
    if (userInput.trim() !== '') {
      // Translate user input into both languages
      const translatedInput1 = getTranslatedInput(userInput, language1);
      const translatedInput2 = getTranslatedInput(userInput, language2);
      setUserInput('');

      // Simulate a bot response based on user input
      const botResponse = getBotResponse(translatedInput1, translatedInput2);
      alert(botResponse); // For simplicity, displaying the response in an alert

      // Update translations
      updateTranslations(translatedInput1, translatedInput2);
    }
  };*/

  const getTranslatedInput = (input, language) => {
    const matchedInput = responseDataset.find(
      (data) => input.toLowerCase() === data.inputs[language]
    );

    return matchedInput ? matchedInput.inputs.english : input;
  };

  const getBotResponse = (userInput1, userInput2) => {
    // Find a response in the dataset based on user input
    const matchedData = responseDataset.find(
      (data) => userInput1.toLowerCase() === data.inputs.english
    );

    // Return the response or a default message if no match is found
    if (matchedData) {
      return `${matchedData.responses[language1]} - ${matchedData.responses[language2]}`;
    } else {
      return '...';
    }
  };

  const updateTranslations = (translatedInput1, translatedInput2) => {
    // Update translations for display
    const updatedTranslations = responseDataset.map((data) => ({
      input: data.inputs.english,
      translation1: data.inputs[language1],
      translation2: data.inputs[language2],
      response: data.responses[language1] || data.responses.english,
    }));

    setTranslations([...translations, ...updatedTranslations]);
  };

  return (
    <Container>
      <UserInputSpriteWrapper>
      <img src={right} alt=''/> 
      <div>
        <label>Select Language 1: </label>
        <select value={language1} onChange={(e) => setLanguage1(e.target.value)}>
          <option value="english">English</option>
          {/* Add more languages as needed */}
        </select>
        <label>Select Language 2: </label>
        <select value={language2} onChange={(e) => setLanguage2(e.target.value)}>
         <option value="telugu">Telugu</option>
          {/* Add more languages as needed */}
        </select>
      </div>
      <div className='text-input'>
       {/*} <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          onKeyDown={handleSendMessage}
          placeholder="Type your message..."
        />*/}
        <label>నేను:</label>
        <select onChange={(e) => handleUserInput(e.target.value)}>
          {responseDataset.map((data, index) => (
            <option key={index} value={data.inputs.english}>
              {data.inputs.english}
            </option>
          ))}
        </select>
        </div>
      </UserInputSpriteWrapper>
      <BotResponse response={getBotResponse(userInput, userInput)} />
    </Container>
  );
};

export default ChatBot;

const Container = styled.div` 
font-family: Roboto Condensed;      
display: flex;
flex-direction: row;
      flex-wrap: nowrap;    
      align-items: center;
      justify-content: center;
      background: linear-gradient(131deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%), center center / cover;
      height: 765px;
    }
    
`;

const UserInputSpriteWrapper = styled.div`
font-family: Roboto Condensed; 
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;    
  align-items: left;
  justify-content: left;
  text-align: left;
  border-radius: 0.75rem;
  border: 2px solid darkpurple;
  background: transparent;
  backdrop-filter: blur(50px);
  padding: 25px;
  margin: 20px 50px;
`;