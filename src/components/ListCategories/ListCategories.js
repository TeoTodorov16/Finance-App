import react, { useEffect, useState, useContext } from 'react';
import {
    getRef,
    getOnValue,
    deleteRecord,
    updateRecord
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
    Tooltip,
    IconButton,
    Skeleton,
    TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UserContext from '../../context/UserContext';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { CreateCategory } from '../CreateCategory/CreateCategory';
import { formatter } from '../../utils/genUtils';

export const ListCategories = () => {

    // data state
    const { user } = useContext(UserContext);
    const [ categories, setCategories ] = useState(false);
    const [ value, setValue ] = useState();
    
    // UI State 
    const [ cardHover, setCardHover ] = useState(null);
    const [ cardClicked, setCardClicked ] = useState(null);
    const [ editorDialogOpen, setEditorDialogOpen ] = useState(false);
    const [ cat, setCat ] = useState(null);

    const setOpenWrapper = (x) => {
        setEditorDialogOpen(x);
    }

    const updateCat = (val, isDeposit, category) => {
        if (isDeposit) {
            val*=-1;
        }
        updateRecord(`categories/${user.userID}`, category.id, category)
        .then();
    }

    const updateCatQuick = (val, category) => {
        if (val.includes('-')) {
            val = val.replace('-','');
            if(!isNaN(val)) {
                const newBal = Number(category.balance) - Number(val);
                category['balance'] = newBal;
                updateRecord(`categories/${user.userID}`, category.id, category)
                .then((res)=>{
                    setValue('');
                });
            }
        } else {
            if(!isNaN(val)) {
                const newBal = Number(category.balance) + Number(val);
                category['balance'] = newBal;
                updateRecord(`categories/${user.userID}`, category.id, category)
                .then((res)=>{
                    setValue('')
                });
            }
        }
        
    }

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

    const handleEnter = () => {
        console.log(value);      
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
            width: '98%',
        }}>
            <CreateCategory
                open = {editorDialogOpen}
                cat = { cat }
                setOpenWrapper = {setOpenWrapper}
            />
            <Divider>
                <Box sx = {{
                    margin: '0px 15px 0px 15px',
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography variant = 'h4' sx = {{
                        letterSpacing: '5px'
                    }}>
                        YOUR CATEGORIES
                    </Typography>
                    <Tooltip title = 'Create New Category'>
                        <Fab 
                            size = {'small'}
                            color="primary"
                            aria-label="add"
                            sx ={{'&:hover': {transform: 'scale(1.2)'}}}
                            onClick = {() => {
                                setOpenWrapper(true);
                                setCat(null);
                            }}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>   
                </Box>
            </Divider>
                <Grid container spacing = {3} sx = {{margin: '15px'}}>
                    { categories?.length > 0 && categories.map((x) => {
                        return (
                            <Grid item>
                                <Tooltip title = 'Click to withdraw or deposit'>
                                    <Card 
                                        onClick = {() => {
                                            if (cardClicked) {
                                                setCardClicked(null);
                                            } else {
                                                setCardClicked(x.id);
                                            }
                                        }}
                                        onMouseEnter={() => {
                                            setCardHover(x.id);
                                        }}
                                        onMouseLeave={() => { 
                                            setCardHover(null); 
                                            setCardClicked(null);
                                            setValue('');
                                        }}
                                        sx = { cardHover === x.id ? {
                                            margin:'-10px',
                                            height: '250px',
                                            width: '250px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            cursor: 'pointer',
                                        } : {
                                            height: '220px',
                                            width: '220px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            cursor: 'pointer'
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

                                        {(cardHover === x.id || cardClicked === x.id) &&
                                                <Box sx = {{
                                                    display: 'flex',
                                                    gap: '10px',
                                                    padding: '20px',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <IconButton sx = {{width: '40px', height: '40px'}}>
                                                        -
                                                    </IconButton>
                                                    <form 
                                                        style = {{width: '100%'}}
                                                        onSubmit = {(e) => {
                                                            e.preventDefault();
                                                            if(!isNaN(value)) {
                                                                updateCatQuick(value, x);
                                                        }
                                                    }}>
                                                        <TextField
                                                            autoFocus = {true}
                                                            // focused = {true}
                                                            variant = 'standard'
                                                            sx = {{ width: '100%' }}
                                                            onChange = {(e) => {
                                                                setValue(e.target.value);
                                                                console.log(e.target.value);
                                                            }}
                                                            value = {value}
                                                            name = {'value'}
                                                        />
                                                    </form>

                                                    
                                                    <IconButton sx = {{width: '40px', height: '40px'}}>
                                                        +
                                                    </IconButton>

                                                </Box>

                                            
                                            }
                                        
                                        <Box sx = {{
                                            marginTop: 'auto',
                                        }}>

                                            
                                            
                                            { cardHover === x.id ? 
                                                <Box sx = {{
                                                    display: 'flex',
                                                    padding: '0px 10px 5px 10px'
                                                }}>
                                                    <IconButton>
                                                        <SwapHorizIcon />
                                                    </IconButton>
                                                    <Box onClick = {() => {
                                                        setCat(x);
                                                        setEditorDialogOpen(true);
                                                    }}>
                                                        <IconButton>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Box>
                                                    <Box onClick = {() => {
                                                        deleteRecord(`categories/${user.userID}`, x.id);
                                                    }}
                                                    sx = {{
                                                        marginLeft: 'auto'
                                                    }}>
                                                        <IconButton >
                                                            <DeleteForeverIcon color= 'error'/>
                                                        </IconButton>
                                                    </Box>  
                                                </Box>  
                                            : 
                                                <></> 
                                            }
                                        </Box>         
                                    </Card>
                                </Tooltip>
                            </Grid>
                        )
                    }) } 
                    
                    {/* {
                        categories === false && 
                        <Grid 
                            container 
                            spacing = {3} 
                            sx = {{margin: '15px'}}
                        > 
                            <Grid item>
                                <Skeleton 
                                    sx = {{
                                        borderRadius: '5px'
                                    }}
                                    variant = 'rectangular' 
                                    height = {200}
                                    width = {200}
                                /> 
                            </Grid>
                            <Grid item>
                                <Skeleton 
                                    sx = {{
                                        borderRadius: '5px'
                                    }}
                                    variant = 'rectangular' 
                                    height = {200}
                                    width = {200}
                                /> 
                            </Grid>
                            <Grid item>
                                <Skeleton 
                                    sx = {{
                                        borderRadius: '5px'
                                    }}
                                    variant = 'rectangular' 
                                    height = {200}
                                    width = {200}
                                /> 
                            </Grid>
                        </Grid>   
                    } */}
                    {/* { categories?.length === 0 && 
                    <Box sx = {{
                        margin: '15px',
                        height: '100%',
                        width: '100%',
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <Typography variant = 'h5' color = 'error'>
                            Looks like you don't have any categories.
                        </Typography>
                        <Typography color = 'primary'>
                            To better track your spending click the big + icon above to get started making categories.
                        </Typography>

                    </Box>
                    } */}         
                </Grid>     
        </Box>
    );
}
