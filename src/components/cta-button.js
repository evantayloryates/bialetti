import React from 'react';

import { ExternalLinkIcon } from '~/components';

const CTAButton = ({ onEvent, onClick, bgColor }) => {
  
  const handleClick = (event) => {
    onEvent(event, "ctaBtn", "click");
    onClick();
  }

  return (
    <div className='product-overlay-cta' style={{backgroundColor: bgColor}} onClick={handleClick}>
      <div>Buy Now</div>
      <ExternalLinkIcon />
    </div>
  )
}

export default CTAButton;