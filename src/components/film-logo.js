import React from 'react';

const FilmLogo = ({ visibilityClass, onEvent, onClick}) => {
  const handleClick = (event) => {
    onEvent(event, "filmLogoBtn", "click");
    onClick();
  }

  return (
    <div className={`title-logo ${visibilityClass}`} onClick={handleClick}>
      <img src={"https://bialetti-assets.s3.us-west-1.amazonaws.com/film-logo.png"} />
    </div>
  );
}

export default FilmLogo;