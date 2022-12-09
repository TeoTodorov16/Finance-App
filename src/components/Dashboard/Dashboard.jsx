import { useEffect, useContext } from 'react';
import {
    Box,
    Paper,
    Divider
} from '@mui/material';
import UserContext from '../../context/UserContext';
import { CreateCategory } from '../CreateCategory/CreateCategory';
import { ListCategories } from '../ListCategories/ListCategories';

export function Dashboard (props) {

    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log(`this is the user from context from crud: ${user.userID}`);
        // createCategory(user.userID);
    },[]);

    return (
        <Box>
            <CreateCategory />
            <Divider />
            <ListCategories />
        </Box>
    )
}