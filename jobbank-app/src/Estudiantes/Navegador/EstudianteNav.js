import React, { useState } from "react";
import './EstudianteNav.css';
import logo from "./ImagenesNav/holberton-logo.png";
import UserIcon from "./ImagenesNav/user-icon.png";
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import apiPath from "../../ApiPath";
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

const pages = ['Puestos de Trabajo', 'Mis Postulaciones'];
const settings = ['Ver Perfil', 'Editar Perfil', 'Cerrar Sesión'];


const cookies = new Cookies();

// Function that removes cookies from the current session
function closeSessionEst() {
    
    cookies.remove("student_id", {path: "/"});
    cookies.remove("firstname", {path: "/"});
    cookies.remove("lastname", {path: "/"});
    cookies.remove("email", {path: "/"});
    cookies.remove("github", {path: "/"});
    cookies.remove('pres_or_remot', {path:"/"});
    cookies.remove('availability', {path:"/"});
    cookies.remove('phonenumber', {path:"/"});
    cookies.remove('age', {path:"/"});
    cookies.remove('nationality', {path:"/"});
    cookies.remove('description', {path:"/"});
    cookies.remove('disp_travel', {path:"/"});
    cookies.remove('linkedin', {path:"/"});
    cookies.remove('twitter', {path:"/"});
    cookies.remove('province', {path:"/"});
    cookies.remove('developer_type', {path:"/"});
    cookies.remove('english_level', {path:"/"});
    cookies.remove('video_link', {path:"/"});
    cookies.remove('portfolio', {path:"/"});
    cookies.remove('is_public', {path:"/"});
    cookies.remove('student_skills', {path:"/"});
    cookies.remove('token', {path:"/"});
    cookies.remove('created_at', {path:"/"});
    cookies.remove('updated_at', {path:"/"});
    cookies.remove('deleted_at', {path:"/"});
    cookies.remove('created_by', {path:"/"});
    cookies.remove('updated_by', {path:"/"});
    cookies.remove('deleted_by', {path:"/"});
    cookies.remove('deleted', {path:"/"});
    cookies.remove('cv_filename_physical', {path:"/"});
    cookies.remove('cv_filename_logical', {path:"/"});
    cookies.remove('photo_filename_physical', {path:"/"});
    cookies.remove('photo_filename_logical', {path:"/"});
    window.location.href="/home";
}

// Navigator component
function EstudianteNav() {

  const { logout } = useAuth0();
  const [student, setStudent] = useState([2]);

  React.useEffect(() => {
    obtenerDatosDeEstudiantes();
  }, []);

  let student_id = cookies.get('student_id')

  const obtenerDatosDeEstudiantes = async () => {
    const data = await fetch(`${apiPath}/students/${student_id}`);
    const applications = await data.json();
    setStudent(applications);
  }

  let history = useHistory();

  let photo = UserIcon;

  if (student.photo_filename_logical != null && student.photo_filename_logical != undefined){
    photo = `${apiPath}/student_photos/${student.photo_filename_logical}`;
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page === 'Puestos de Trabajo'){
      history.push("/estudiante/puestos-de-trabajo");
    } 
    if (page === 'Mis Postulaciones'){
      history.push("/estudiante/mis-postulaciones");
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Ver Perfil'){
      const win = window.open(`/home/candidate/${student_id}`, "_blank");
      win.focus();
    } 
    if (setting === 'Editar Perfil'){
      history.push("/estudiante/perfil");
    } 
    if (setting === 'Cerrar Sesión'){
      closeSessionEst(); 
      logout();
    }
  };


  return (
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
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none'},
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ 
                  m: 2,
                  textTransform: "none",
                  fontSize: "20px",
                  fontWeight: 400,
                  color: 'white', 
                  display: 'block', 
                  '&:hover': {
                    color: '#ce3938',
                  },
                }}
                style={{margin: '16px', padding: '6px 8px'}}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Configuraciones">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={photo} />
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
                <MenuItem style={{display: 'flex', padding: '6px 16px'}} key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export { EstudianteNav };
