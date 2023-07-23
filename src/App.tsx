import React, { useEffect, useState } from 'react';
import Bialetti from './Bialetti';

const App = () => {

  useEffect(() => {
    if ('ontouchstart' in window) { // Check if it's a touch device
      document.body.classList.remove('no-touch');
      document.body.classList.add('touch');
    } else {
      document.body.classList.remove('touch');
      document.body.classList.add('no-touch');
    }
  }, []); // Empty dependency array ensures this runs only on mount and unmount


  return (
    <Bialetti />
  );
}

export default App;
