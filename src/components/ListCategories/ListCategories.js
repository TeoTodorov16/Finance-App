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
    Fab,
    Tooltip
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import UserContext from '../../context/UserContext';
import { formatter } from '../../utils/genUtils';

export const ListCategories = () => {

    // data state
    const { user } = useContext(UserContext);
    const [ categories, setCategories ] = useState([]);

    // UI State 
    const [ cardHover, setCardHover ] = useState(null);
    const [ cardClicked, setCardClicked ] = useState(null);

    // FUNCTIONS // 

    const getCategories = () => {
        const ref = getRef(`categories/${user.userID}`);
        getOnValue(ref, (snapshot) => {
            const cats = snapshot.val();
            const newCats = [];
            for (let cat in cats) {
              newCats.push({
                id: cat,
                name: cats[cat].name,
                balance: cats[cat].balance,
              });
            }
            setCategories(newCats);
          });
    }

    // USE EFFECT //
    useEffect(() => {
        if (user.userID) {
            getCategories();
        }   
    },[]);

    useEffect(() => {
        console.log(categories); 
    },[categories.length]);

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
                                <Tooltip title = 'Click for more options'>
                                    <Card 
                                        onClick = {() => {
                                            if (cardClicked) {
                                                setCardClicked(null);
                                            } else {
                                                setCardClicked(x.id);
                                            }
                                        }}
                                        onMouseEnter={()=>{setCardHover(x.id)}}
                                        onMouseLeave={()=>{setCardHover(null); setCardClicked(null)}}
                                        sx = { cardHover === x.id ? {
                                            margin:'-10px',
                                            height: '220px',
                                            width: '220px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        } : {
                                            height: '200px',
                                            width: '200px',
                                            display: 'flex',
                                            flexDirection: 'column'
                                    }}>
                      
                                        <CardContent>
                                            <Typography variant = 'h5'>
                                                {x.name}
                                            </Typography>
                                            <Divider />
                                            <Typography>
                                                {formatter.format(x.balance)}
                                            </Typography>   
                                        </CardContent>
                                        <Box sx = {{
                                            marginTop: 'auto',
                                            display: 'flex',
                                            padding: '10px'
                                        }}>
                                            { cardClicked === x.id ? 
                                                <Button>Yo</Button> 
                                            : 
                                                <></> 
                                            }
                                        </Box>         
                                    </Card>
                                </Tooltip>
                            </Grid>
                        )
                    }) }          
                </Grid>     
        </Box>
    );
}
