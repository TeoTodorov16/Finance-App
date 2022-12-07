import { useContext } from 'react';
import {
    TextField,
    Box,
    Paper,
    Button
} from '@mui/material';

import {
    createCategory
} from '../../utils/crud';

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

    const submit = (e) => {
        e.preventDefault();
        createCategory(user.userID, {
            name: formValues.name,
            value:formValues.balance
        });
    }

    return (
       <Paper>
            <Box>
                <TextField value = {formValues.name} onChange = {handleChange} />
                <TextField value = {formValues.balance} onChange = {handleChange} />
                <Button variant = {`outlined`} onClick = {submit}>
                    CREATE CATEGORY
                </Button>
            </Box>
       </Paper>
    );
}