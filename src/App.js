import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/MiniDrawer';
import DiscordAuth from './components/discordAuth';
import { AuthProvider } from './AuthContext';
import './App.css'
import SPLRaids from './components/SplRaids'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const handleVerification = (token) => {
    // Handle the verified token here
    // You can set state or perform other actions based on the token
  };
  return (
   <>
   <AuthProvider>
   <Sidebar/>
   </AuthProvider>
   
   </>
  );
}

export default App;
