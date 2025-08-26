import React, { useContext, useState } from 'react'
import '../sidebar/Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../content/Context'
import Plis from '../../../src/assets/Plus_icon2.png'
import { VscHistory } from "react-icons/vsc";
const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const { onSent, prevPrompts, setRecentPrompt , newChat } = useContext(Context)
  const loadPrompt =async (prompt) => {
    await onSent(prompt)
  }
  return (
    <div className='Sidebar'>
      <div className="top">
        <img 
          onClick={() => setExtended(prev => !prev)} 
          className='menu' 
          src={assets.menu_icon} 
          alt="menu" 
        />

        <div onClick={()=>newChat()} className="newchat">
          <img src={Plis} className='w-5' alt="plus" />
          {extended && <p>new chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">recent</p>
            {prevPrompts.map((item, index) => (
              <div onClick={()=>loadPrompt(item)} key={index} className="recent-entry">
                <img src={assets.message_icon} alt="message" />
                <p>{item.slice(0,18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="button-item recent-entry">
          <img src={assets.question_icon} alt="question" />
          {extended && <p>help</p>}
        </div>

        <div className="button-item recent-entry">
          <VscHistory className='c'/>
          {extended && <p>activity</p>}
        </div>

        <div className="button-item recent-entry">
          <img src={assets.setting_icon} alt="settings" />
          {extended && <p>settings</p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
