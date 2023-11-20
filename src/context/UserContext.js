import React, { createContext, useContext, useState } from 'react';


const Context = createContext();


export function useUserContext() {
  return useContext(Context);
}


export function ContextProvider({ children }) {
    const [isLoggedIn, setLoggedInContext] = useState(false);
    const [username, setUsernameContext] = useState('');
  
  
    
  
    return (
      <Context.Provider value={{ isLoggedIn, setLoggedInContext, username, setUsernameContext }}>
        {children}
      </Context.Provider>
    );
  }