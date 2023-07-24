import React from 'react';

const ProductMedia = ({ src, active }) => {

  return (
    <img className={`product-media ${active && 'active'}`} src={src} />
  )
}

export default ProductMedia;
