import React, { useState,useContext,useEffect } from 'react';
import { createTheme, ThemeProvider, Switch } from '@mui/material';
import { deepPurple, amber } from '@mui/material/colors';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import TwitterIcon from '@mui/icons-material/Twitter';
import RadarChartOutlined from '@ant-design/icons/RadarChartOutlined'
import TokenTable from './TokenTable';
import { Icon } from '@iconify/react';
import TableBurnedLP from './tableBurnedLP';
import DiscordAuth from './discordAuth'
import { AuthContext } from '../AuthContext';
import { Avatar, message } from 'antd';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../AuthContext';
import SPLRaids from './SplRaids'
import Home from './Home'


const SplHunter = () => {

    const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { isAuthorized, verifyRole } = useContext(AuthContext); 
  const handleClick = (url) => {
    window.location.href = url; // This will navigate in the same tab
  };
  const listItems = [
    { text: 'Twitter', url: 'https://twitter.com/SPLabs_sol', icon: <TwitterIcon /> },
    { text: 'Discord', url: 'https://discord.gg/rfZRuxMSVa', icon: <Icon icon="mingcute:discord-line" width="26" /> },
  ];
  const firstMenuSection = [
    { text: 'Twitter', url: '/', icon: <TwitterIcon /> },
    { text: 'Discord', url: '/spl-hunter', icon: <Icon icon="mingcute:discord-line" width="26" /> },
  ];

  const handleClicksocial = (url) => {
    // Open the URL in a new tab
    window.open(url, '_blank');
  };
  useEffect(() => {
    console.log("isAuthorized effect triggered:", isAuthorized);
    if (isAuthorized) {
      showSnackbar('User is authorized', 'success'); // Directly show snackbar on authorization
    }
    else
      showSnackbar('User is not authorized', 'error');
  }, [isAuthorized]);

  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const showSnackbar = (message, severity) => {
    console.log(`Showing Snackbar: ${message}, Severity: ${severity}`); // New log
    setSnackbarInfo(prevState => ({
      ...prevState,
      open: true,
      message: message,
      severity: severity
    }));
    setTimeout(() => {
      setSnackbarInfo(prevState => ({ ...prevState, open: false }));
    }, 10000);
  };

  const closeSnackbar = () => {
    setSnackbarInfo({ ...snackbarInfo, open: false });
  };

   

  // Existing verifyDiscordRole function
  const verifyDiscordRole = async (discordToken) => {
    try {
      console.log('Verification process started');
      showSnackbar('Verification in progress...', 'info'); // Check if this is called
      await verifyRole(discordToken);
      console.log('Verification process successful');
      showSnackbar('Verification successful', 'success'); // Check if this is called
    } catch (error) {
      console.error('Error verifying role:', error);
      showSnackbar('Verification failed', 'error'); // Check if this is called
    }
  };

  
 

  

  return (
    <div>
         
          <Snackbar
            open={snackbarInfo.open}
            autoHideDuration={10000}
            onClose={closeSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Alert onClose={closeSnackbar} severity={snackbarInfo.severity} sx={{ width: '100%' }}>
              {snackbarInfo.message}
            </Alert>
          </Snackbar>
          {!isAuthorized && <DiscordAuth onVerified={verifyDiscordRole} />}
          {isAuthorized && <TableBurnedLP  />}
          {/* Other components */}

    </div>
  )
}

export default SplHunter