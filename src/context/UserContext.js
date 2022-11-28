import { createContext } from 'react';

const init = {
    username: '',
    password: '',
    userID: '',
    isAuth: ''
}

const UserContext = createContext(init);
export default UserContext;
