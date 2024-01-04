import './App.css';
import React, { useEffect, useState } from 'react';
import Sidebar from './components/MiniDrawer';
import TokenTable from './components/TokenTable';

import { createTheme, ThemeProvider, Switch } from '@mui/material';
import 'antd/dist/reset.css'; // Import Ant Design styles


const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>

      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode}/>
    </div>
  )
}

export default App