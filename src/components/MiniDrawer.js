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
import TwitterIcon from '@mui/icons-material/Twitter';
import RadarChartOutlined from '@ant-design/icons/RadarChartOutlined'
import TokenTable from './TokenTable';
import { Icon } from '@iconify/react';
import TableBurnedLP from './tableBurnedLP';
import DiscordAuth from './discordAuth'
import { AuthContext } from '../AuthContext';
import { message } from 'antd';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const MiniDrawer = ({ darkMode, setDarkMode }) => {
    
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { isAuthorized, verifyRole } = useContext(AuthContext); 
  const listItems = [
    { text: 'Twitter', url: 'https://twitter.com/SPLabs_sol', icon: <TwitterIcon /> },
    { text: 'Discord', url: 'https://discord.gg/rfZRuxMSVa', icon: <Icon icon="mingcute:discord-line" width="26" /> },
  ];

  const handleClick = (url) => {
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

  
  const theme2 = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: deepPurple[500],
      },
      secondary: {
        main: amber[500],
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  


  return (
    <ThemeProvider theme={theme2}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            SPLabs
          </Typography>

        </Toolbar>

      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['SPL Hunter'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <RadarChartOutlined width="26"/> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {listItems.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => handleClick(item.url)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
      
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
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
          {isAuthorized && <TableBurnedLP darkMode={darkMode} setDarkMode={setDarkMode} />}
          {/* Other components */}
        </Box>
     
      </Box> 
    </ThemeProvider>
  );
};
export default MiniDrawer;

