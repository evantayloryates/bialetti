import React from 'react';

import { ExternalLinkIcon } from '~/components';

const BrandBadge = ({ onEvent, onClick }) => {
  
  const handleClick = (event) => {
    onEvent(event, "brandBadge", "click");
    onClick();
  }

  return (
    <div className='brand-badge' onClick={handleClick} >
      <img src={"https://bialetti-assets.s3.us-west-1.amazonaws.com/brand-logo.png"} />
      <ExternalLinkIcon color='rgba(10,10,10,.8)'/>
    </div>
  )
}

export default BrandBadge;