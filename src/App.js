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
import { Header } from './components/OurComponents/OurComponents';

// material-ui 
import {
  Container,
  AppBar,
  Button,
  Typography,
  Page,
  Card,
  IconButton,
  Toolbar
} from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

function App() {

  const [ user, setUser ] = useState({});
  const [ message, setMessage ] = useState(null); 

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

  if ( !user.isAuth ) {
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
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Message 
        type = { message?.type } 
        message = { message?.message } 
      />
      <UserContext.Provider value = {{ user, setUser, popMessage }} >
        <Example />
      </UserContext.Provider> 
    </Container>    
  );
}

export default App;
