import React, { useContext, useRef, useState } from 'react'
import '../main/main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../content/Context'

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)
  
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(null)

  const handleGalleryClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if(file) {
      setPreview(URL.createObjectURL(file)) // نمایش پیش‌نمایش
    }
  }

  const removePreview = () => {
    setPreview(null)
    fileInputRef.current.value = null
  }

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <p id='w'>Welcome back Mahan !</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>

            <div className='cards'>
              <div className='card'>
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div className='card'>
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div className='card'>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>

              <div className='card'>
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>

            <div className="main-bottom">
              {/* پیش‌نمایش عکس بالای ورودی */}
              {preview && (
                <div className="image-preview-small">
                  <img src={preview} alt="preview" />
                  <button onClick={removePreview}>×</button>
                </div>
              )}

              <div className="searchbox">
                <input 
                  onChange={(e) => setInput(e.target.value)} 
                  value={input} 
                  type="text" 
                  placeholder='Enter a prompt here ' 
                />
                <div>
                  <img onClick={handleGalleryClick} src={assets.gallery_icon} alt="gallery" />
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <img src={assets.mic_icon} alt="mic" />
                  {input && <img onClick={() => onSent()} src={assets.send_icon} alt="send" />}
                </div>
              </div>

              <p className="bottom-info">
                Gemini may display introduced info including about people, so double-check its responses. Your privacy and Gemini Apps.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>

              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading
                  ? <div className='loader'>
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  : <p dangerouslySetInnerHTML={{ __html: resultData }} />
                }
              </div>
            </div>

            <div className="main-bottom">
              {preview && (
                <div className="image-preview-small">
                  <img src={preview} alt="preview" />
                  <button onClick={removePreview}>×</button>
                </div>
              )}

              <div className="searchbox">
                <input 
                  onChange={(e) => setInput(e.target.value)} 
                  value={input} 
                  type="text" 
                  placeholder='Enter a prompt here ' 
                />
                <div>
                  <img onClick={handleGalleryClick} src={assets.gallery_icon} alt="gallery" />
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <img src={assets.mic_icon} alt="mic" />
                  {input && <img onClick={() => onSent()} src={assets.send_icon} alt="send" />}
                </div>
              </div>

              <p className="bottom-info">
                Gemini may display introduced info including about people, so double-check its responses. Your privacy and Gemini Apps.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Main
