import react, { useContext, useEffect, useState } from 'react';
import {
    TextField,
    Box,
    Paper,
    Button
} from '@mui/material';

import {
    getRef,
    createRecord,
    updateRecord
} from '../../utils/firebase';

import UserContext from '../../context/UserContext';

export function CreateCategory() {
    
    const { user } = useContext(UserContext);
    
    const [ formValues, setFormValues ] = useState({
        name: '',
        balance: 0.00
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]:value
        });
    }

    const createCategory = (userID, category) => {
        createRecord(`categories/${userID}`, category).then((x) => console.log(x));
    }

    const submit = (e) => {
        e.preventDefault();
        createCategory(user.userID, {
            name: formValues.name,
            balance:formValues.balance
        });
    }

    return (
       <Paper>
            <Box>
                <TextField 
                    name = {'name'}
                    value = {formValues.name} onChange = {handleChange} 
                />
                <TextField 
                    name = {'balance'}
                    value = {formValues.balance} onChange = {handleChange} 
                />
                <Button variant = {`outlined`} onClick = {submit}>
                    CREATE CATEGORY
                </Button>
            </Box>
       </Paper>
    );
}