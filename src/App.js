// from the npms
import React, {
  useState,
  useEffect,
  useContext
} from 'react';

// from this project 
import './App.css';
import Example from './components/Example';
import Login from './components/login/Login';
// import Signup from './components/signup/Signup';
import Message from './components/message/Message';
import UserContext from './context/UserContext';

function App() {

  const [ user, setUser ] = useState({});
  const [ message, setMessage ] = useState(null); 

  /**
   * 
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

  useEffect(() => {
    popMessage('general', 'Welcome!!')
  }, []);

  return (
    <div className = 'App-wrapper'>
      <Message 
        type = { message?.type } 
        message = { message?.message } 
      />
      <UserContext.Provider value = {{ user, popMessage }} >
        <Login />
      </UserContext.Provider> 
    </div>    
  );
}

export default App;
