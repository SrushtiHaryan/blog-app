import React, { createContext, useContext, useState } from 'react';

// Create the Cart Context
const Context = createContext();

// Custom Hook to use the Cart Context
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