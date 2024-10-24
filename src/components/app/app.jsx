import React, { useEffect } from 'react';
import { Navbar ,NotFound} from './../index';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const [mode, setMode] = React.useState(() => {
    // localStorage dan rejimni oling
    const storedMode = localStorage.getItem('mode');
    return storedMode ? storedMode === 'dark' : false; // Default to light mode
  });
 
  
  // Effect to sync mode with localStorage
  useEffect(() => {
    localStorage.setItem('mode', mode ? 'dark' : 'light');

  }, [mode]);

  return (
    <div className={`container `}>
      <Navbar mode={mode} setMode={setMode} />

      <Routes>
        <Route index element={"Home"} />
        <Route path="/saveds" element={"saveds"} />
        <Route path="/content" element={"content"} />
        <Route path="/filter" element={"filter"} />
        <Route path="*" element={<NotFound mode={mode}/>} />


      </Routes>
      

    </div>
  );
}

export default App;
