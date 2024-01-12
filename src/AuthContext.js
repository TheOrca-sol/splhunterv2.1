// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const verifyRole = async (code) => {
    // Perform your verification logic here
    // Update isAuthorized based on the verification result
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('https://theorca.pythonanywhere.com/verify-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
      });
      const data = await response.json();
      setIsAuthorized(data.isAuthorized);
    } catch (error) {
      console.error('Error verifying role:', error);
      setErrorMessage('Failed to verify role. Please try again later.');
    }
    setIsLoading(false);
  
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, verifyRole }}>
      {children}
    </AuthContext.Provider>
  );
};
