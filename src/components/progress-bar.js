import React from 'react';

const ProgressBar = ({ overlayMode, percent }) => {

  const visibilityClass = overlayMode ? 'overlay-mode' : 'player-mode';

  return (
    <div className={`progress-bar-container ${visibilityClass}`}>
      <div className='progress-bar' />
      <div className='progress-bar-complete' style={{width: `${percent}%`}} />
    </div>
  )
}

export default ProgressBar;