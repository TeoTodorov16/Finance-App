import './App.css';
import Example from './components/Example';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Message from './components/message/Message';
function App() {

  
  return (
    <div>
      <Message type = {'error'} message = {'hello'} />
      <Example></Example>
      <Login />
    </div>
  );
}

export default App;
