import react, { useContext, useEffect, useState } from 'react';
import {
    TextField,
    Box,
    Paper,
    Button,
    Dialog,
    Divider,
    DialogTitle,
    IconButton
} from '@mui/material';

import {
    getRef,
    createRecord,
    updateRecord
} from '../../utils/firebase';

import UserContext from '../../context/UserContext';
import CloseIcon from '@mui/icons-material/Close';

export function CreateCategory(props) {

    const { open, cat, setOpenWrapper } = props || null;
    const { user } = useContext(UserContext);

    const [ formValues, setFormValues ] = useState({
        name: '',
        balance: 0.00,
        limit: 0.00,
    });

    useEffect(() => {
        if(cat) {
            setFormValues({
                ...formValues,
                name: cat.name,
                balance: cat.balance,
                limit: cat.limit,
            })
        } else {
            setFormValues({
                name: '',
                balance: '',
                limit: '',
            })
        }
    },[cat]);

    const handleClose = () => {
        setOpenWrapper(false);
        setFormValues({
            name: '',
            balance: '',
            limit: ''
        })
    }

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

    const updateCategory = (userID, category) => {
        updateRecord(`categories/${userID}`, category.id, category)
        .then((x) => console.log(x));
    }

    const submit = (e) => {
        e.preventDefault();
        if(cat) {
            updateCategory(user.userID, {
                id: cat.id,
                name: formValues.name,
                balance:formValues.balance,
                limit: formValues.limit,
            });
            return;
        }
        createCategory(user.userID, {
            name: formValues.name,
            balance:formValues.balance,
            limit: formValues.limit,
        });
    }

    return (
        <Dialog
            open = { open }
            onClose = { handleClose }
        >
            <Box sx = {{
                display: 'flex',
                flexDirection: 'column',
                margin: '10px'
            }}>
                <Box sx = {{
                    width: '100%',
                    display:'flex'
                }}>

                    <DialogTitle>
                    {cat ? `Edit ${cat.name}` : `Create New Category`} 
                    </DialogTitle>
                    <Box onClick = {handleClose} sx ={{marginLeft: 'auto'}}>
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                </Box>

                
                <Divider />
                <form style = {{
                    display:'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '10px'
                }}>
                    <TextField 
                        autoFocus = {true}
                        label = 'Category Name'
                        name = {'name'}
                        value = {formValues.name || ''} 
                        onChange = {handleChange} 
                    />
                    <TextField 
                        label = 'Initial Balance'
                        name = {'balance'}
                        value = {formValues.balance ? formValues.balance : formValues.balance == '0' ? formValues.balance : ''}
                        onChange = {handleChange} 
                    />
                    <TextField 
                        label = 'limit'
                        name = {'limit'}
                        value = {formValues.limit ? formValues.limit : formValues.limit == '0' ? formValues.limit : ''}
                        onChange = {handleChange} 
                    />
                </form>
                <Divider />
                <Box sx = {{
                    display:'flex',
                    gap: '10px',
                    margin: '10px'
                }}>
                    <Button variant = {`contained`} onClick = {submit}>
                        {cat ? 'SAVE' : 'CREATE CATEGORY'}
                    </Button>
                    {/* <Button color = 'warning' onClick = {handleClose}>
                        ABORT
                    </Button> */}
                </Box>
            </Box>
            
       </Dialog>
    );
}