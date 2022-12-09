import { useEffect, useContext } from 'react';
import { createCategory } from '../../utils/crud';
import UserContext from '../../context/UserContext';

import { CreateCategory } from '../CreateCategory/CreateCategory';

export function Dashboard (props) {

    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log(`this is the user from context from crud: ${user.userID}`);
        // createCategory(user.userID);
    },[]);

    return (
        <CreateCategory />
    )
}