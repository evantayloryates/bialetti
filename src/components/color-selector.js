import React from 'react';

const ColorSelector = ({ id, styleColor, onEvent, onClick, selected }) => {
  
  const baseStyles = {
    cursor: 'pointer', 
    width: '32px', 
    height: '32px', 
    borderRadius: '50%', 
    backgroundColor: styleColor,
    border: '2px solid #efefef',
    boxShadow: 'rgba(0, 0, 0, 0.667) 0px 1px 2px -1px',
  };

  const getStyles = () => {
    const selectedStyles = {
      ...baseStyles,
      // filter: "brightness(0.7)",
      // border: `1px solid ${styleColor}`,
      // boxShadow: `0px 0px 0px 1px ${styleColor}`,
    }
    return selected ? selectedStyles : baseStyles;
  }

  const handleClick = (event) => {
    const stateString = selected ? 'Active' : 'Inactive';
    onEvent(event, `${id}ColorButton${stateString}`, "click");
    onClick();
  }

  return (
    <div className="color-selector-container" onClick={handleClick}>
      <div style={getStyles()} />
      {selected && <div className="selection-indicator"/> }
    </div>
  )
  }
export default ColorSelector;
