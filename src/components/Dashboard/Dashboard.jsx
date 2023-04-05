import { useEffect, useContext } from 'react';
import {
    Box,
    Paper,
    Divider
} from '@mui/material';
import UserContext from '../../context/UserContext';
import { ListCategories } from '../ListCategories/ListCategories';

export function Dashboard (props) {

    const { user } = useContext(UserContext);

    return (
        <Box sx = {{
            display: 'flex'
        }}>
            <ListCategories />
        </Box>
    )
}