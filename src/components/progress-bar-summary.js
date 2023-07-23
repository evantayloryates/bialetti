import React from 'react';

const ProgressBarSummary = ({ overlayMode, currentSeconds, totalSeconds }) => {
  const readyToRender = (currentSeconds || currentSeconds === 0) && (totalSeconds || totalSeconds === 0)
  
  const visibilityClass = overlayMode && readyToRender ? 'visible' : 'hidden';

  return (
    <div className={`progress-bar-summary ${visibilityClass}`}>
      {`${currentSeconds}`} of {`${totalSeconds}s`}
    </div>
  )
}

export default ProgressBarSummary;