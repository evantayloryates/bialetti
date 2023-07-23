import React from 'react';

const PlayIcon = ({ paused, togglePaused, onEvent }) => {
  const targetId = paused ? "playBtn" : "pauseBtn"
  
  const handleClick = (event) => {
    onEvent(event, targetId, "click");
    togglePaused();
  }

  const handleMouseEnter = (event) => {
    // onEvent(event, targetId, "mouseEnter");
  }

  const handleMouseLeave = (event) => {
    // onEvent(event, targetId, "mouseLeave");
  }

  return (
    <div 
      className='play-icon-container' 
      onClick={handleClick} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* PLAY ICON*/}
      { paused && 
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="#181818"></path></svg>
      }
      {/* PAUSE ICON*/}
      { !paused && 
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icon-nfplayerPause"><path fillRule="evenodd" clipRule="evenodd" d="M4.5 3C4.22386 3 4 3.22386 4 3.5V20.5C4 20.7761 4.22386 21 4.5 21H9.5C9.77614 21 10 20.7761 10 20.5V3.5C10 3.22386 9.77614 3 9.5 3H4.5ZM14.5 3C14.2239 3 14 3.22386 14 3.5V20.5C14 20.7761 14.2239 21 14.5 21H19.5C19.7761 21 20 20.7761 20 20.5V3.5C20 3.22386 19.7761 3 19.5 3H14.5Z" fill="#181818"></path></svg>
      }
    </div>
  )
}

export default PlayIcon;