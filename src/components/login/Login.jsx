import react, { useState, useEffect, useContext } from 'react';
import {
    login
} from '../../utils/firebase';
import {
    TextField,
    Button,
    Box,
    Paper,
    Typography,
    IconButton,
    Divider
} from '@mui/material';
import UserContext from '../../context/UserContext';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './login.css';

const Login = () => {

    // grab setmessage for context... 
    const { popMessage, setUser } = useContext(UserContext);

    const initialCredentials = {
        username: '',
        password: '',
    }

    // set formValues will be called onChange of the username and password field pairs. 
    const [ formValues, setFormValues ] = useState(initialCredentials);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ formErrors, setFormErrors ] = useState({});

    useEffect(() => {
        if(Object.keys(formErrors).length == 0 && isSubmitting){
            submit();
        }
    }, [formErrors, isSubmitting]);

    /**
     * @Todo might be leaving the front end work to my man Teo...
     * login form needs returned...
     * With a username and password text field
     * signin button. 
     * signup button -> will navigate (or be link to) the signup page.
     */
    // 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors({...validate(formValues)});
        setIsSubmitting(true);
    }

    const validate = () => {
        const errors = {}
        return {};
        // for( [key, value] of Object(formValues)) {

        // }
    }

    const submit = () => {
        login(formValues.username, formValues.password)
        .then((userCredential) => {
            setUser({
                username: formValues.username,
                password: formValues.password,
                isAuth: true
            })
            popMessage('success',
            `Welcome, ${formValues.username}`);
        })
        .catch((error) => {
            console.error(error);
            popMessage('error',
            `Bad username or password. Try again.`);
        })
    }

    return (
            <Paper sx ={{
                padding: '30px 40px 30px 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                width: '350px'
            }}> 
                <Box sx = {{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Typography variant = 'h5' sx = {{
                        letterSpacing: '7px'
                    }}>
                        Hello
                    </Typography>
                </Box>
                <form onSubmit = {handleSubmit}>
                    <Box sx = {{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        marginBottom: '20px'
                    }}>
                        <TextField 
                            label = {'username'}
                            name = {'username'}
                            value = {formValues.username}
                            onChange = {handleChange}
                        />
                        <TextField 
                            label = {'password'}
                            name = {'password'}
                            value = {formValues.password}
                            type = {'password'}
                            onChange = {handleChange}
                        />
                    </Box>

                    <Box sx = {{ display: 'flex'}}>
                        <Button 
                            variant = 'contained' 
                            onClick = {handleSubmit}
                            sx = {{letterSpacing: '5px', marginLeft: 'auto'}}
                            endIcon = {<ArrowForwardIcon sx = {{marginLeft: '10px'}} /> }
                        >
                            Login
                        </Button>
                    </Box>  
                    <Divider sx = {{margin: '20px 0px 20px 0px'}}/> 
                </form>
            </Paper>

    )
}

export default Login;