import React, { useEffect } from 'react';
import { Navbar } from './../index';

const App = () => {
  const [mode, setMode] = React.useState(() => {
    // localStorage dan rejimni oling
    const storedMode = localStorage.getItem('mode');
    return storedMode ? storedMode === 'dark' : false; // Default to light mode
  });
 
  
  // Effect to sync mode with localStorage
  useEffect(() => {
    localStorage.setItem('mode', mode ? 'dark' : 'light');
    document.body.className = mode ? 'dark-mode' : 'light-mode'; 
  }, [mode]);

  return (
    <div className={`container ${mode ? 'dark-mode' : ''}`}>
      <Navbar mode={mode} setMode={setMode} />

    </div>
  );
}

export default App;
