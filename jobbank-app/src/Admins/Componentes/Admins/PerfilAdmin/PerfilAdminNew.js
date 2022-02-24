import React, { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import UserIcon from "../../../Navegador/ImagenesNav/user-icon.png"
import { useHistory } from "react-router";
import swal from 'sweetalert';
import apiPath from '../../../../ApiPath';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const cookies = new Cookies();

const PerfilAdminNew = ({ updateData, dataToEdit}) => {

  // Form with empty string start

  const initailForm = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };

  // Adding state to fill the form
  const [form, setForm] = useState(initailForm);

  useEffect(() => {
    setForm(dataToEdit);
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, 
    });
  };

  // Get photoname
  const [admin, setAdmin] = useState([2]);

  React.useEffect(() => {
    obtenerDatosDeAdmins();
  }, []);

  let admin_id = cookies.get('admin_id')

  const obtenerDatosDeAdmins = async () => {
    const data = await fetch(`${apiPath}/admins/${admin_id}`);
    const applications = await data.json();
    setAdmin(applications);
  }

  // Photo in form
  let photo = UserIcon;
  if (admin.photo_filename_logical != null && admin.photo_filename_logical != undefined){
    photo = `${apiPath}/admin_photos/${admin.photo_filename_logical}`;
  }

  // Photo name in form
  useEffect(() => {
  let photoname = "";

  if (admin.photo_filename_physical != null && admin.photo_filename_physical != undefined){
    photoname = admin.photo_filename_physical;
  }

  const PhotoId = document.getElementById('photo-id');

  if (cookies.get('photo_filename_physical') !== 'null') {
    PhotoId.innerText = photoname;
  } else {
    PhotoId.innerText = "Aún no se ha subido ninguna imagen";
  }
  });

  // Sweetalert to confirm when the user clicks in Guardar cambios
  const history = useHistory();
  let uploadInputImage = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs() === true) {
      swal({
        title: "EDITAR ADMINISTRADOR",
        text: `¿Está seguro de guardar los nuevos cambios realizados en el administrador "${dataToEdit.firstname} ${dataToEdit.lastname}"?`,
        buttons: ["Cancelar", "Guardar"],
      }).then((willEdit) => {
        if (willEdit) {

          // updateData function
          async function updateForm() {
            const updata = await updateData(form);
          
            if (uploadInputImage.files[0] != undefined || uploadInputImage.files[0] != null) {
              const data = new FormData();
              data.append('file', uploadInputImage.files[0]);
              const urlupload = `${apiPath}/admins/`+ cookies.get('admin_id') + '/uploadphoto'
  
              fetch(urlupload, {
                method: 'PUT',
                body: data,
              }).then((response) => {
                response.json().then((body) => {
                  cookies.set('photo_filename_physical', body.photo_filename_physical);
                });
              })
            }

          cookies.set('firstname', form.firstname, {path:"/"});
          cookies.set('lastname', form.lastname, {path:"/"});

          swal("HAS EDITADO EXITOSAMENTE LOS DATOS DEL ADMINISTRADOR", {
              timer:"1800"
          });
          setTimeout(() => {
            history.go(0);
          }, 1000);
          window.scrollTo(0, 0);
        }
        updateForm();
        }
      });
    } else {
      swal({
        title: "Se ha producido un error",
        text: "Por favor revise que haya ingresado sus datos correctamente",
        icon: "error",
        button: "Aceptar"
      });
    }
  }

    // Getting variables from html
    const inputFirstname = document.getElementById('inputFirstname');
    const inputLastname = document.getElementById('inputLastname');
    const inputEmail = document.getElementById('inputEmail');
    const inputPassword = document.getElementById('inputPassword');
    const inputRepeatPassword = document.getElementById('inputRepeatPassword');
  
   // Validate form inputs
   function validateInputs() {
    let formIsValid = true;
  
    const firstnamevalue = inputFirstname.value.trim();
    const formFirstname = document.getElementById('form-firstname');
    const errorFirstname = document.getElementById('smallFirstname');
  
    if (firstnamevalue === "") {
      formFirstname.className = 'form-control error';
      errorFirstname.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u.test(firstnamevalue))) {
      formFirstname.className = 'form-control error';
      errorFirstname.innerText = "Use solo letras.";
      formIsValid = false;
    } else {
      formFirstname.classList.remove('error');
    }
  
    const lastnamevalue = inputLastname.value.trim();
    const formLastname = document.getElementById('form-lastname');
    const errorLastname = document.getElementById('smallLastname');
  
    if (lastnamevalue === "") {
      formLastname.className = 'form-control error';
      errorLastname.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u.test(lastnamevalue))) {
      formLastname.className = 'form-control error';
      errorLastname.innerText = "Use solo letras.";
      formIsValid = false;
    } else {
      formLastname.classList.remove('error');
    }
  
    const emailvalue = inputEmail.value.trim();
    const formEmail = document.getElementById('form-email')
    const errorEmail = document.getElementById('smallEmail')
  
    if (emailvalue === "") {
      formEmail.className = 'form-control error';
      errorEmail.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(emailvalue))) {
      formEmail.className = 'form-control error';
      errorEmail.innerText = "Por favor ingrese un email válido";
      formIsValid = false;
    } else {
      formEmail.classList.remove('error');
    }
  
    const passwordvalue = inputPassword.value.trim();
    const formPassword = document.getElementById('form-password')
    const errorPassword = document.getElementById('smallPassword')
  
    if (passwordvalue === "") {
      formPassword.classList.remove('error');
    } else if (!(/^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(passwordvalue))) {
      formPassword.className = 'form-control error';
      errorPassword.innerText = "Use entre 8 y 20 caracteres. Mínimo una letra Mayúscula, una letra minúscula y un número";
      formIsValid = false;
    } else {
      formPassword.classList.remove('error');
    }
  
    const repeatpasswordvalue = inputRepeatPassword.value.trim();
    const formRepeatPassword = document.getElementById('form-repeat-password')
    const errorRepeatPassword = document.getElementById('smallRepeatPassword')
  
    if (passwordvalue != repeatpasswordvalue) {
      formRepeatPassword.className = 'form-control error';
      errorRepeatPassword.innerText = "La contraseña no coincide";
      formIsValid = false;
    } else {
      formRepeatPassword.classList.remove('error');
    }
  
    return formIsValid
  }


const [file, setFile] = useState(undefined);

const handleChangea = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
}

  return (
    <Container maxWidth="sm">
      <Box className="box-form">
        <Typography variant="h5" component="div" gutterBottom>
          Editar perfil
        </ Typography>
        {file
          ? <Avatar id="avatar-photo" alt="Remy Sharp" src={file} sx={{ width: 300, height: 300 }} />
          : <Avatar id="avatar-photo" alt="Remy Sharp" src={photo} sx={{ width: 300, height: 300 }} />
        }
        <div className="cv-photo">
          <a id='photo-id' value={cookies.get('photo_filename_logical')}>{cookies.get('photo_filename_physical')}</a>
        </div>
        <input ref={(ref) => { uploadInputImage = ref; }} type="file" accept="image/*" onChange={handleChangea} />
        <small id="photoHelpInline" className="text-muted">Please upload a square-shaped picture. Max 2MB, Formats allowed: jpg, png.</small>
        <Box className="box-form-content">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nombre *" type="text" variant="standard" name="firstname" onChange={handleChange} value={form.firstname} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Apellidos *" variant="standard" name="lastname" onChange={handleChange} value={form.lastname} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email *" variant="standard" name="email" onChange={handleChange} value={form.email} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="outlined-password-input" label="Contraseña" type="password" autoComplete="current-password" variant="standard" name="password" value={form.password} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth id="outlined-password-input" label="Repetir contraseña" type="password" name="password" variant="standard"/>
            </Grid>
          </Grid>
          <Button variant="contained"
            type="submit"
            onClick={handleSubmit}
            value="Enviar" 
            fullWidth sx={{mt: 3, mb: 2}}>Guardar cambios</Button>
        </Box>
      </Box>
    </Container>
  )
};

export default PerfilAdminNew;