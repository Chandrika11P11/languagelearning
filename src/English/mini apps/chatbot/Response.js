// BotResponse.js
import React from 'react';
import styled from 'styled-components';
import left from './left.png'

const ResponseSpriteWrapper = styled.div`
font-family: Roboto Condensed; 
  color: white;
  display: flex;  
  flex-wrap: nowrap;
  flex-direction: column;    
  align-items: left;
  justify-content: left;
  text-align: right;
  border-radius: 0.75rem;
  border: 2px solid darkpurple;
  background: transparent;
  backdrop-filter: blur(50px);
  padding: 10px;
  margin: 20px 50px;
`;
const SpriteTwoDescription = styled.p`
font-family: Tiro Telugu;  
position: absolute;  
  font-size: 12px;
  color: Black;
  margin: 55px 260px;
`;
const Resp = styled.p`
font-size: 15px;
display: inline-block;
width: 500px;
height: 80px;
box-sizing: border-box;
outline: none;
border: 1px solid lightgray;
border-radius: 3px;
padding: 10px 10px 10px 100px;
transition: all 0.1s ease-out;
`

const ResponseLabel = styled.label`
   position: absolute;
   top: 0;
   left: 0;
   bottom: 0;
   height: 40px;
   line-height: 40px;
   border-radius: 3px 0 0 3px;
   padding: 0 20px;  
   background: #ffc918;
   font-family: Tiro Telugu;
   color: black;
`;

const BotResponse = ({response}) => (
  <ResponseSpriteWrapper>
    <div className='imgleft'><img src={left} alt=''/></div>
    <div className='text-inputtwo'>
    <label>నా స్నేహితులు:</label>
    <p>{response}</p>
    </div>
  </ResponseSpriteWrapper>
);

export default BotResponse;
