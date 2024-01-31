import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Description from './Description'
import Words from './mini apps/Words'
import './English.css'
import ChatBot from './mini apps/chatbot/ChatBot'

//Routes to Navigate to Home, Words and conversation

const English = () => {
    
  return (
    <div>
      <div className='header'>
        <ul className='navbar'>
          <li className='nav-item'><NavLink exact to="/home">{'|'}Home{'|'}</NavLink></li>
          <li className='nav-item'><NavLink to="/words">{'|'}పదాల అర్దాలు{'|'}</NavLink></li>
          <li className='nav-item'><NavLink to="/conversation">{'|'}సంభాషణలు{'|'}</NavLink></li>
        </ul>
      </div>
        <Routes>
          <Route path="/home" element={<Description />}/>
          <Route path="/words" element={<Words />}/>
          <Route path="/conversation" element={<ChatBot/>}/>
        </Routes>
    </div>
  )
}

export default English