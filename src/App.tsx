import React, { createContext, useState } from 'react';
import './App.css';
import RouterPage from './components/RouterPage/index'

export let  MyContext = createContext({})


function App() {
  const [q, setQ] = useState("it works");
  return (
    <MyContext.Provider value={{q, setQ}}>
      <RouterPage />
    </MyContext.Provider>
  );
}

export default App;
