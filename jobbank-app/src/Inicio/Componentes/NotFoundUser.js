import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from "./holberton-logo.png";
import { useLocation } from "react-router-dom"
import ErrorIcon from '@mui/icons-material/Error';
import { styled } from '@mui/system';

const StyledButtonReturn = styled(Button)`
  background-color: #1b0c61;
  color: #fff;
  padding: 6px 12px;
  &:hover {
    background-color: #3a20bc;
    color: #fff;
  }
`;


const pages = [];
const settings = ['Cerrar Sesión'];


function NotFoundUser() {
  const { logout } = useAuth0();

  const location = useLocation();

  console.log("object");
  console.log(location.state.deleted)

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Cerrar Sesión'){
      logout();
    }
  };

  return (
    
    <Box>
    <AppBar sx={{ bgcolor: "#1b0c61"}} position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          <Avatar
              alt="Remy Sharp"
              src={ logo }
              sx={{ width: 40, height: 40 }}
          />
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
        >
          <Avatar
              alt="Remy Sharp"
              src={ logo }
              sx={{ width: 40, height: 40 }}
          />
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))}
        </Box>
          
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
    </AppBar>
    <Box sx={{ width: "100%", minHeight: "640px",display: "flex",flexDirection: "column",alignItems: "center"}}>
      <Box sx={{ width: "70%",minHeight: "640px", display: "flex",flexDirection: "column",alignItems: "center", justifyContent: "start"}}>
        <ErrorIcon sx={{ fontSize: 200 , color: "#DF003C"}}/>
        <Typography sx={{ fontWeight: 'bold', color: "#1b0c61", my: "40px" }} variant="h3" textAlign="center">
          Lo sentimos mucho, su usuario
          {
            (location.state.deleted !== 1)
            ?
              " no se encuentra dentro del sistema."
            :
              " ha sido eliminidado del sistema."
          }
        </Typography>
        
        <Typography sx={{ fontWeight: 'bold', color: "#1b0c61", my: "40px" }} variant="h4" textAlign="center">
          Por favor, póngase en contacto con el administrador del sitio:      
        </Typography>
        <Typography sx={{ fontWeight: 'bold', color: "#1b0c61" }} variant="h4" textAlign="center">
          valery.vargas@holbertonschool.com        
        </Typography>
        <StyledButtonReturn href="/home" variant="contained" sx={{m: 10}}>
					Volver al inicio
				</StyledButtonReturn>
      </Box>
    </Box>
    </Box>
  );
}

export default NotFoundUser;