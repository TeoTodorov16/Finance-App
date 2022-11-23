import { createContext } from 'react';

const init = {
    username: '',
    password: '',
    isAuth: ''
}
const UserContext = createContext(init);
export default UserContext;
