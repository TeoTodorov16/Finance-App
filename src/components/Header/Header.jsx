
import {
    Container,
    AppBar,
    Button,
    Typography,
    Page,
    Card,
    IconButton,
    Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import './header.css';

export function Header (props) {
   return (
    <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
   )
}