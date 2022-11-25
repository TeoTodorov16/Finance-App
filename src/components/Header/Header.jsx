import * as React from 'react';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Icon, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { DarkMode, LightMode } from '@mui/icons-material';

import { GiMoneyStack } from 'react-icons/gi';

const DRAWERWIDTH = 310;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${DRAWERWIDTH}px)`,
    marginLeft: `${DRAWERWIDTH}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export function Header() {
  const theme = useTheme();
  const { open, setOpen, user, handleLogout, userTheme, setUserTheme } = useContext(UserContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  }; 

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
   <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx = {{width: '100%', display: 'flex'}}>
            <Typography sx={{padding: '10px 10px 0px 0px'}} variant="h4" component="div">
                <GiMoneyStack size = {40} style = {{
                  marginRight: '5px'
                }}/> 
            </Typography>
            <Typography sx={{padding: '12px 10px 0px 0px', fontWeight: '700'}} variant="h6" noWrap component="div">   
                My Money App
            </Typography>
            <Box mt = {.7} sx = {{ marginLeft: 'auto' }}>
                <IconButton >
                    {userTheme === 'dark' 
                    ? <LightMode onClick = {() => setUserTheme('light')} /> 
                    : <DarkMode onClick = {() => setUserTheme('dark')}/>
                    }
                </IconButton> 
            </Box>   
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWERWIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWERWIDTH,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx = {{
            padding: '0px 20px 0px 20px',
            height: '100px',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
          <Avatar size = {30} /> 
          <Typography> {user.username} </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem key = { 1 } disablePadding onClick = {handleLogout}>
              <ListItemButton>
                <ListItemIcon>
                    <IconButton>
                        <Tooltip title = 'Logout'>
                            <LogoutIcon/>
                        </Tooltip>    
                    </IconButton> 
                </ListItemIcon>
                <ListItemText primary = { 'I\'m done'} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
      </>
  );
}