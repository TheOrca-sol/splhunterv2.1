import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/MiniDrawer';
import DiscordAuth from './components/discordAuth';
import { AuthProvider } from './AuthContext';
import './App.css'
import SPLRaids from './components/SplRaids'

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const handleVerification = (token) => {
    // Handle the verified token here
    console.log("Verified Token: ", token);
    // You can set state or perform other actions based on the token
  };
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/discord-auth" element={<DiscordAuth  onVerified={handleVerification}/>} />
          <Route path='/spl-raids' element={<SPLRaids/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
