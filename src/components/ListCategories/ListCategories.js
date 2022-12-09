import react, { useEffect, useState, useContext } from 'react';

import {
    getRef,
    getOnValue,
} from '../../utils/firebase';

import {
    Box,
    Paper,
    Typography,
    Button,
    Card
} from '@mui/material';

import UserContext from '../../context/UserContext';

export const ListCategories = () => {
    const { user } = useContext(UserContext);
    const [ categories, setCategories ] = useState();

    useEffect(() => {
        if (user.userID) {
            getCategories();
        }   
    },[]);

    const getCategories = () => {
        const ref = getRef(`categories/${user.userID}`);
        console.log(ref);
    }

    return(
        <Box>
            <Paper sx = {{
                padding: '50px'
            }}>
                <Box>
                    <Typography>
                        This is where categories will be
                    </Typography>
                </Box>     
            </Paper>
        </Box>
    );
}
