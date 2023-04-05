// from the npms
import React, {
  useState,
  useEffect,
  useContext
} from 'react';

// from this project 
import './App.css';
import {
  logout
} from './utils/firebase';
import Example from './components/Example';
import Login from './components/login/Login';
// import Signup from './components/signup/Signup';
import Message from './components/message/Message';
import UserContext from './context/UserContext';
import { Header, Dashboard } from './components/OurComponents/OurComponents';
// material-ui 
import {
  Container,
  AppBar,
  Button,
  Typography,
  Card,
  IconButton,
  Toolbar,
  styled,
  useTheme,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Box
} from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

import { grey, blueGrey } from '@mui/material/colors';

import { useStorageState } from 'react-storage-hooks';

function App() {
  // const [value, setValue] 

  const [ user, setUser ] = useStorageState(localStorage, 'state-user', {});
  const [ message, setMessage ] = useState(null); 

  // for menu open status 
  const [ open, setOpen ] = useState(false);

  // for styles
  const [ userTheme, setUserTheme ] = useStorageState(localStorage, 'state-theme', 'dark');


  /**
   * @param {string} type specify if this is an 'error' a 'success' or 'general' for general (for styling)
   * @param {*} message what do you want the message to say?
   */
  const popMessage = (type, message) => {
    setMessage({
      type,
      message
    });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  const handleLogout = () => {
    logout(user.username, user.password)
    .then(popMessage('error', 'You\'re logged out!'));
    setUser({});
  }

  useEffect(() => {
    popMessage('general', 'Welcome!!')
  }, []);

  const DRAWERWIDTH = 240;

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const darkTheme = createTheme({
    palette: {
        mode: 'dark',

      },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: blueGrey[300]
      },
    },
  });

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${DRAWERWIDTH}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  if ( !user.isAuth ) {
    return (
      <ThemeProvider theme = {userTheme === 'dark' ? darkTheme: lightTheme}>
        <CssBaseline />
        <UserContext.Provider value = {{ user, setUser, popMessage }} >
          <Box sx = {{
            display: 'flex',
            height: '100vh',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Box mt = {.7} sx = {{ display: 'flex', marginLeft: 'auto'}}>
                <IconButton sx = {{marginLeft: 'auto'}}>
                    {userTheme === 'dark' 
                    ? <LightMode onClick = {() => setUserTheme('light')} /> 
                    : <DarkMode onClick = {() => setUserTheme('dark')}/>
                    }
                </IconButton> 
            </Box>
            <Box sx = {{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Login />
            </Box>
          </Box>
        </UserContext.Provider> 
      </ThemeProvider>
        
    
    );
  } 

  return (
    <>
      <ThemeProvider theme = {userTheme === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
        <UserContext.Provider value = {{
          user,
          handleLogout,
          setUser,
          popMessage,
          open,
          setOpen,
          userTheme,
          setUserTheme
        }} >
          <Box sx={{ display: 'flex' }}>
            <Header />
            <Main open={open}>
              <DrawerHeader />
              <Dashboard />
            </Main>
          </Box>
        </UserContext.Provider> 
      </ThemeProvider>
    </>    
  );
}

export default App;
