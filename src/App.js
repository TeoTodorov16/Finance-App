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
  Page,
  Card,
  IconButton,
  Toolbar,
  styled,
  useTheme,
  CssBaseline,
  Box
} from '@mui/material';

function App() {

  const [ user, setUser ] = useState({});
  const [ message, setMessage ] = useState(null); 

  // for menu open status 
  const [ open, setOpen ] = useState(false);

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

  if ( !user ) {
    return (
      <div className = 'App-wrapper'>
        <Message 
          type = { message?.type } 
          message = { message?.message } 
        />
        <UserContext.Provider value = {{ user, setUser, popMessage }} >
          <Login /> 
        </UserContext.Provider> 
      </div>    
    );
  } 

  return (
    <>
      <CssBaseline />
      <UserContext.Provider value = {{ user, setUser, popMessage, open, setOpen }} >
        <Box sx={{ display: 'flex' }}>
          <Header />
          <Main open={open}>
            <DrawerHeader />
            <Dashboard />
          </Main>
        </Box>
      </UserContext.Provider> 
    </>    
  );
}

export default App;
