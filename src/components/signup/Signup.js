import react, { useState, useEffect } from 'react';
import {
    signup
} from '../../utils/firebase';
import './signup.css';

const Signup = () => {

    const initialCredentials = {
        username: '',
        password: '',
    }

    // set formValues will be called onChange of the username and password field pairs. 
    const [ formValues, setFormValues ] = useState(initialCredentials);


    /**
     * @Todo might be leaving the front end work to my man Teo...
     * sign up form needs returned...
     * With a username and password text field
     * signup button
     */
    return <></>
}

export default Signup;