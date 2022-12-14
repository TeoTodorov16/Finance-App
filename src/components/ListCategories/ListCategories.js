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
    Card,
    CardContent,
    Divider,
    Grid,
    CardActionArea,
    Fab
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import UserContext from '../../context/UserContext';

export const ListCategories = () => {

    const { user } = useContext(UserContext);
    const [ categories, setCategories ] = useState([]);

    // UI State 

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        if (user.userID) {
            getCategories();
        }   
    },[]);

    useEffect(() => {
        console.log(categories); 
    },[categories.length]);

    const getCategories = () => {
        const ref = getRef(`categories/${user.userID}`);
        getOnValue(ref, (snapshot) => {
            const cats = snapshot.val();
            const newCats = [];
            for (let cat in cats) {
              newCats.push({
                name: cats[cat].name,
                balance: cats[cat].balance,
              });
            }
            setCategories(newCats);
          });
    }

    return(
        <Box sx = {{
            padding: '10px',
        }}>
            
            <Divider>
                <Box sx = {{
                    margin: '0px 15px 0px 15px',
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography variant = 'h3'>
                        Your Categories
                    </Typography>
                    <Fab 
                        size = {'small'}
                        color="primary"
                        aria-label="add"
                    >
                        <AddIcon />
                    </Fab>
                </Box>
            </Divider>
                <Grid container spacing = {3} sx = {{margin: '15px'}}>  
                    { categories.map((x) => {
                        return (
                            <Grid item>
                                <Card sx = {{
                                    height: '200px',
                                    width: '200px',
                                    display: 'flex',
                                }}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography variant = 'h5'>
                                                {x.name}
                                            </Typography>
                                            <Divider />
                                            <Typography>
                                                {formatter.format(x.balance)}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
             
                                </Card>
                            </Grid>
                        )
                    }) }          
                </Grid>     
        </Box>
    );
}
