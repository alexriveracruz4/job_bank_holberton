import React, { useState, useEffect, useRef } from "react";
import "./PerfilAdmin.css"
import Cookies from "universal-cookie";
import UserIcon from "../../../Navegador/ImagenesNav/user-icon.png"
import { useHistory } from "react-router";
import swal from 'sweetalert';
import apiPath from '../../../../ApiPath';

const cookies = new Cookies();

const CrudForm = ({ updateData, dataToEdit}) => {

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
            await updateData(form);
          
          setTimeout(() => {
            if (uploadInputImage.files[0] != undefined || uploadInputImage.files[0] != null) {
              const data = new FormData();
              data.append('file', uploadInputImage.files[0]);
              const urlupload = `${apiPath}/admins/`+ cookies.get('admin_id') + '/uploadphoto'
  
              fetch(urlupload, {
                method: 'POST',
                body: data,
              }).then((response) => {
                response.json().then((body) => {
                  cookies.set('photo_filename_physical', body.photo_filename_physical);
                });
              })
            }
          }, 500);

          cookies.set('firstname', form.firstname, {path:"/"});
          cookies.set('lastname', form.lastname, {path:"/"});

          swal("HAS EDITADO EXITOSAMENTE LOS DATOS DEL ADMINISTRADOR", {
              timer:"1500"
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

  // See the chosen image
  const uploadedImage = React.useRef(null);

  const handleImageUploaded = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const {current} = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
          current.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-profile-admin-edit">
      <div className="profile-title">
        <h1>Editar perfil</h1>
      </div>

      <div className='container-form'>
        <form className='form'>

          <div className='form-control'>
            <div className="form-Admin">
              <div className="form-div">
                <form className="form-form">
                  <div className="photoform-div">
                    <label htmlFor="inputPhoto" className="col-form-label">Foto de perfil</label>
                    <div className='usericon-div'>
                      <img src={ UserIcon } ref={uploadedImage} className="usericon-form" alt="imagen de usuario" />
                    </div>
                    <small id="photoHelpInline" className="text-muted">Please upload a square-shaped picture. Max 2MB, Formats allowed: jpg, png.</small>
                    <div className="container-selectFile">
                      <div className="box-photo form-control">
                        <input ref={(ref) => { uploadInputImage = ref; }} type="file" accept="image/*" onChange={handleImageUploaded} />
                      </div>
                      <div className="cv-photo">
                        <a id='photo-id' value={cookies.get('photo_filename_logical')}>{cookies.get('photo_filename_physical')}</a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="form-control" id='form-firstname'>
            <label htmlFor="inputFirstname">Nombre</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputFirstname" name="firstname" onChange={handleChange} maxLength={45} value={form.firstname}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallFirstname'> Error message </small>
          </div>

          <div className="form-control" id='form-lastname'>
            <label htmlFor="inputLastname">Apellidos</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputLastname" name="lastname" onChange={handleChange} maxLength={45} value={form.lastname}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallLastname'> Error message </small>
          </div>

          <div className="form-control" id='form-email'>
            <label htmlFor="inputEmail">Email</label>
            <div className="inputFormDiv">
              <input type="email" className="form-control" id="inputEmail" name="email" onChange={handleChange} maxLength={60} value={form.email} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallEmail'> Error message </small>
          </div>

          <div className="form-control" id='form-password'>
            <label htmlFor="inputPassword">Contraseña</label>
            <div className="inputFormDiv">
              <input type="password" className="form-control" id="inputPassword" name="password" onChange={handleChange} maxLength={20} value={form.password}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallPassword'> Error message </small>
          </div>

          <div className="form-control" id='form-repeat-password'>
            <label htmlFor="inputRepeatPassword">Repetir Contraseña</label>
            <div className="inputFormDiv">
              <input type="password" className="form-control" id="inputRepeatPassword" name="password" maxLength={20}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallRepeatPassword'> Error message </small>
          </div>

          <div className="div-button-edit-admin">
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={handleSubmit}
              value="Enviar">Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default CrudForm;
