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
    TextField,
    Snackbar,
    Alert,
    Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UserContext from '../../context/UserContext';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveIcon from '@mui/icons-material/Remove';

import { CreateCategory } from '../CreateCategory/CreateCategory';
import { formatter } from '../../utils/genUtils';
import { Warning } from '@mui/icons-material';

export const ListCategories = () => {

    // data state
    const { user } = useContext(UserContext);
    const [ categories, setCategories ] = useState(false);
    const [ value, setValue ] = useState();
    const [ cat, setCat ] = useState(null);
    
    // UI State 
    const [ cardHover, setCardHover ] = useState(null);
    const [ cardClicked, setCardClicked ] = useState(null);
    const [ editorDialogOpen, setEditorDialogOpen ] = useState(false);
    const [ transfer, setTransfer ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ noCats, setNoCats ] = useState(false);

    const setOpenWrapper = (x) => {
        setEditorDialogOpen(x);
    }

    const updateCat = (val, isDeposit, category, trans) => {
        if (!isDeposit) {
            updateCatQuick(`-${val}`, category);
            return;
        }
        updateCatQuick(val, category, trans);
    }

    const updateCatQuick = (val, category, trans) => {
        if (val.includes('-')) {
            val = val.replace('-','');
            if(!isNaN(val)) {
                const newBal = Number(category.balance) - Number(val);
                category['balance'] = newBal;
                updateRecord(`categories/${user.userID}`, category.id, category)
                .then((res)=>{
                    if(trans === false) {setValue('');}
                });
                
            }
        } else {
            if(!isNaN(val)) {
                const newBal = Number(category.balance) + Number(val);
                category['balance'] = newBal;
                updateRecord(`categories/${user.userID}`, category.id, category)
                .then((res)=>{
                    if(trans === false) {setValue('');}
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
        if(categories.length === 0) {
            setNoCats(true);
            return; 
        } 
        setNoCats(false);
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
                    { noCats 
                        && <Box sx = {{
                            margin: '15px'
                        }}>
                            <Typography 
                                variant = 'h6'
                                sx = {{letterSpacing: '3px'
                            }}>
                                No categories to display.
                            </Typography>
                            <Typography sx = {{letterSpacing: '2px'}}> 
                                Click the '+' button above to create categories and start your budget.
                            </Typography>
                    </Box> }
                    { categories?.length > 0 && categories.map((x) => {
                        return (
                            <Grid item> 
                                {/**This Card should probably be abstracted. */}
                                <Tooltip title = 'Click to withdraw or deposit'>
                                    <Card 
                                        onClick = {() => {
                                            if (cardClicked) {
                                                setCardClicked(null);
                                            } else {
                                                setCardClicked(x.id);
                                            }
                                            if (transfer) {
                                                updateCatQuick(value, x, false);
                                                setTransfer(false);
                                                setSuccess(true);
                                            }
                                        }}
                                        onMouseEnter={() => {
                                            setCardHover(x.id);
                                        }}
                                        onMouseLeave={() => { 
                                            setCardHover(null); 
                                            setCardClicked(null);
                                            if (!transfer) {
                                                setValue('');
                                            }  
                                        }}
                                        sx = { cardHover === x.id ? {
                                            margin:'-20px',
                                            height: '290px',
                                            width: '290px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            cursor: 'pointer',
                                        } : {
                                            height: '250px',
                                            width: '250px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            cursor: 'pointer',
                                        }}>
                      
                                        <CardContent>
                                            <Box sx = {{
                                                // display: 'flex',
                                                // flexDirection: 'column',
                                                // justifyContent: 'center',
                                                // alignItems: 'center'
                                            }}>
                                                <Typography variant = 'h4' sx = {{
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    letterSpacing: '4px',
                                                    //color: cardHover === x.id ? (theme) => theme.palette.secondary.main : (theme) => theme.palette.text
                                                    fontWeight: cardHover === x.id ? 600 : 400
                                                 }}>
                                                    {x.name}
                                                </Typography>
                                                <Divider />
                                                <Typography variant = 'h6' sx = {{
                                                    width: '100%',
                                                    textAlign: 'center'
                                                }}>
                                                    {formatter.format(x.balance)}
                                                </Typography>
                                            </Box>
                                               
                                        </CardContent>

                                        {((cardHover === x.id || cardClicked === x.id) && !transfer) &&
                                            <>
                                                <Box sx = {{
                                                    padding: '20px 20px 0px 20px',
                                                    display:'flex',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Typography sx = {{
                                                        letterSpacing: '2px',
                                                        color: (theme) => theme.palette.text.disabled,
                                                    }}>
                                                        Withdraw (-) / Deposit (+)
                                                    </Typography>
                                                </Box>
                                                <Box sx = {{
                                                    display: 'flex',
                                                    gap: '10px',
                                                    padding: '20px',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <IconButton sx = {{ 
                                                        width: '40px',
                                                        height: '40px',
                                                        '&:hover' : 
                                                            { 
                                                                "*": {
                                                                    color: (theme) => theme.palette.error.main
                                                                }
                                                            }
                                                        }}
                                                        onClick = {() => {updateCat(value, false, x, false)}}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <form 
                                                        style = {{width: '100%'}}
                                                        onSubmit = {(e) => {
                                                            e.preventDefault();
                                                            if(!isNaN(value)) {
                                                                updateCatQuick(value, x, false);
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

                                                    
                                                    <IconButton
                                                        onClick = {() => {updateCat(value, true, x, false)}} 
                                                        sx = {{ 
                                                            width: '40px',
                                                            height: '40px',
                                                            '&:hover' : { 
                                                                "*": {
                                                                    color: (theme) => theme.palette.success.main
                                                                  }
                                                            }
                                                            }}>
                                                        <AddIcon />
                                                    </IconButton>

                                                </Box>
                                            </>
                                            }
                                        
                                        <Box sx = {{
                                            marginTop: 'auto',
                                        }}>

                                            
                                            
                                            { cardHover === x.id && !transfer? 
                                                <Box sx = {{
                                                    display: 'flex',
                                                    padding: '0px 10px 5px 10px'
                                                }}>
                                                    <IconButton 
                                                        onClick = {() => {
                                                            setTransfer(!transfer);
                                                            updateCat(value, false, x, true)               
                                                        }}
                                                        sx = {{
                                                            '&:hover' : {
                                                                '*' : {
                                                                    color: (theme) => theme.palette.secondary.main
                                                                }
                                                            }
                                                    }}>
                                                        <SwapHorizIcon />
                                                    </IconButton>
                                                    <Box onClick = {() => {
                                                        setCat(x);
                                                        setEditorDialogOpen(true);
                                                    }}>
                                                        <IconButton sx = {{
                                                        '&:hover' : {
                                                            '*' : {
                                                                color: (theme) => theme.palette.warning.main
                                                            }
                                                        }
                                                    }}>
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
       
                <Snackbar open={transfer} autoHideDuration={8000} onClose={() => {}}>
                    <Alert onClose={() => {}} severity="info" sx={{ width: '100%' }}>
                        Choose a category to transfer {formatter.format(value)} to. Click anywhere else to abort.
                    </Alert>
                </Snackbar>  
                <Snackbar open={success} autoHideDuration={6000} onClose={() => {setSuccess(true)}}>
                    <Alert onClose={() => {setSuccess(false)}} severity="success" sx={{ width: '100%' }}>
                        Nice. Monies tranfered. 
                    </Alert>
                </Snackbar> 
      
        </Box>
    );
}
