import react, { useState, useEffect } from 'react';
import {
    login
} from '../../utils/firebase';
import './login.css';

const Login = () => {

    const initialCredentials = {
        username: '',
        password: '',
    }

    // set formValues will be called onChange of the username and password field pairs. 
    const [ formValues, setFormValues ] = useState(initialCredentials);

    useEffect(() => {
        login(formValues.username, formValues.password)
        .then((userCredential) => {
            console.log(userCredential.user);
        })
        .catch((error) => {
            console.error(error);
        })
    })

    /**
     * @Todo might be leaving the front end work to my man Teo...
     * login form needs returned...
     * With a username and password text field
     * signin button. 
     * signup button -> will navigate (or be link to) the signup page.
     */
    // 
    return <></>
}

export default Login;