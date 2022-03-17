import React, { useState, useEffect, useRef } from "react";
import "./EmpresaEditada.css"
import Countries from "../../../../helpers/Countries.json"
import swal from 'sweetalert';
import { useHistory } from "react-router";
import UserIcon from "../../../Navegador/ImagenesNav/user-icon.png"
import Cookies from "universal-cookie";
import apiPath from "../../../../ApiPath";

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";


const cookies = new Cookies();

const CrudForm = ({ updateData, dataToEdit}) => {
  const history = useHistory();
  const AdminID = cookies.get("admin_id");

  // Form with empty string start
  const initailForm = {
    partner_id: "",
    name: "",
    nation: "",
    region: "",
    phonenumber: "",
    email: "",
    password: "",
    web: "",
    description:"",
    updated_by: parseInt(AdminID),
    logo_filename_physical: "",
    logo_filename_logical: "",
  };

  // Adding state to fill the form with the data received from dataToEdit
  const [form, setForm] = useState(initailForm);
  useEffect(() => {
    setForm(dataToEdit);
  }, [dataToEdit]);

  // This event changes the form every time a key is pressed
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, 
    });
  };

  // Get photoname
  const [partner, setPartner] = useState([2]);

  React.useEffect(() => {
    obtenerDatosDePartners();
  }, []);

  let partner_id = form.partner_id

  const obtenerDatosDePartners = async () => {
    const data = await fetch(`${apiPath}/partners/${partner_id}`);
    const applications = await data.json();
    setPartner(applications);
  }

  useEffect(() => {
  let photoname = "";

  if (form.logo_filename_physical !== null && form.logo_filename_physical !== undefined){
    photoname = form.logo_filename_physical;
  }

  const PhotoId = document.getElementById('photo-id');

  if (form.logo_filename_physical !== null) {
    PhotoId.innerText = photoname;
  } else {
    PhotoId.innerText = "Aún no se ha subido ninguna imagen";
  }
  });

  // Photo in form
  let photo = UserIcon;
  if (form.logo_filename_logical !== null && form.logo_filename_logical !== undefined){
    photo = `${apiPath}/partner_photos/${form.logo_filename_logical}`;
  }

  // Sweetalert to confirm when the user clicks in Guardar cambios
  let uploadInputImage = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs() === true) {
      swal({
        title: "EDITAR EMPRESA",
        text: `¿Está seguro de guardar los nuevos cambios realizados en la empresa "${dataToEdit.name}"?`,
        buttons: ["Cancelar", "Guardar"],
      }).then((willEdit) => {
        if (willEdit) {
          // updateData function
          async function updateForm() {
            const updata = await updateData(form);
          
            if (uploadInputImage.files[0] != undefined || uploadInputImage.files[0] != null) {
              const fileSize = uploadInputImage.files[0].size / 1024 / 1024
              if (fileSize < 10) {
                const data = new FormData();
                data.append('file', uploadInputImage.files[0]);
                const urlupload = `${apiPath}/partners/`+ partner_id + '/uploadphoto'
    
                fetch(urlupload, {
                  method: 'POST',
                  body: data,
                }).then((response) => {
                  if (response.ok) {
                    swal("HAS EDITADO EXITOSAMENTE TU PERFIL", {
                      timer:"1500"
                    });
                    setTimeout(() => {
                      history.go(0);
                    }, 1000);
                    window.scrollTo(0, 0);
                  } else {
                    swal({
                      title: "Se ha producido un error",
                      text: "Ocurrió un error al subir la imagen",
                      icon: "error",
                      button: "Aceptar"
                    });
                  }
                })
              } else {
                const formPhoto = document.getElementById('form-photo');
                const errorPhoto = document.getElementById('smallPhotoError');

                formPhoto.className = 'form-control error';
                errorPhoto.innerText = "El tamaño de la imagen sobrepasa los 10MB";
              }
            } else {
              swal("HAS EDITADO EXITOSAMENTE TU PERFIL", {
                  timer:"1500"
              });
              setTimeout(() => {
                history.go(0);
              }, 1000);
              window.scrollTo(0, 0);
            }
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
  const inputName = document.getElementById('inputName');
  const inputNation = document.getElementById('inputNation')
  const inputRegion = document.getElementById('inputRegion');
  const inputPhonenumber = document.getElementById('inputPhonenumber');
  const inputEmail = document.getElementById('inputEmail');
  const inputPassword = document.getElementById('inputPassword');
  const inputRepeatPassword = document.getElementById('inputRepeatPassword');
  const inputWeb = document.getElementById('inputWeb');

  // Validate form inputs
  function validateInputs() {
    let formIsValid = true;

    const namevalue = inputName.value.trim();
    const formName = document.getElementById('form-name');
    const errorName = document.getElementById('smallName');
  
    if (namevalue === "") {
      formName.className = 'form-control error';
      errorName.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u.test(namevalue))) {
      formName.className = 'form-control error';
      errorName.innerText = "Use solo letras.";
      formIsValid = false;
    } else {
      formName.classList.remove('error');
    }

    const nationvalue = inputNation.value.trim();
    const formNation = document.getElementById('form-nation');
    const errorNation = document.getElementById('smallNation');

    if (nationvalue === "") {
      formNation.className = 'form-control error';
      errorNation.innerText = "Complete este campo.";
      formIsValid = false;
    } else {
      formNation.classList.remove('error');
    }
  
    const regionvalue = inputRegion.value.trim();
    const formRegion = document.getElementById('form-region');
    const errorRegion = document.getElementById('smallRegion');
  
    if (regionvalue === "") {
      formRegion.classList.remove('error');
    } else if (!(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u.test(regionvalue))) {
      formRegion.className = 'form-control error';
      errorRegion.innerText = "Use solo letras.";
      formIsValid = false;
    } else {
      formRegion.classList.remove('error');
    }
  
    const phonenumbervalue = inputPhonenumber.value.trim();
    const formPhonenumber = document.getElementById('form-phonenumber');
    const errorPhonenumber = document.getElementById('smallPhonenumber');
  
    if (phonenumbervalue === "") {
      formPhonenumber.classList.remove('error');
    } else if (!(/^\+?\(?\d{1,3}\)?[\s.-]?\d{3}[\s.-]?\d{3,6}$/im.test(phonenumbervalue))) {
      formPhonenumber.className = 'form-control error';
      errorPhonenumber.innerText = "Solo puedes ingresar números.";
      formIsValid = false;
    } else {
      formPhonenumber.classList.remove('error');
    }
  
    const emailvalue = inputEmail.value.trim();
    const formEmail = document.getElementById('form-email')
    const errorEmail = document.getElementById('smallEmail')
  
    if (emailvalue === "" || emailvalue === null) {
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
  
    const webvalue = inputWeb.value.trim();
    const formWeb = document.getElementById('form-web')
    const errorWeb = document.getElementById('smallWeb')
  
    if (!(/^(?=.{0,100}$)\S*$/.test(webvalue))){
      formWeb.className = 'form-control error';
      errorWeb.innerText = "Por favor ingrese máximo 100 caracteres";
    } else {
      formWeb.classList.remove('error');
    }
  
    return formIsValid
  }

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [passwordShownRepeat, setPasswordShownRepeat] = useState(false);
  const togglePasswordRepeat = () => {
    setPasswordShownRepeat(!passwordShownRepeat);
  };

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
    <div className="container-profile-edit-partner">
      <div className="profile-title">
        <h1>Editar hiring partner</h1>
      </div>

      <div className='container-form'>
        <form className='form'>

          <div className='form-control'>
            <div className="form-Estudiante">
              <div className="form-div">
                <form className="form-form">
                  <div className="photoform-div" id="form-photo">
                    <label htmlFor="inputPhoto" className="col-form-label">Foto de perfil</label>
                    <div className='usericon-div'>
                      <img src={ photo } ref={uploadedImage} className="usericon-form" alt="imagen de usuario" />
                    </div>
                    <p id="photoHelpInline" className="text-muted">Seleccione una imagen cuadrada en formato jpg o png, Max 10MB.</p>
                    <div className="container-selectFile">
                      <div className="box-photo form-control">
                        <input ref={(ref) => { uploadInputImage = ref; }} type="file" accept="image/png, image/jpeg" onChange={handleImageUploaded} />
                      </div>
                      <div className="cv-photo">
                        <a id='photo-id' value={form.logo_filename_logical}>{form.logo_filename_physical}</a>
                      </div>
                      <small id='smallPhotoError'> Error message </small>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="form-control" id='form-name'>
            <label htmlFor="inputName">Empresa</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputName" name="name" onChange={handleChange} maxLength={60} value={form.name}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallName'> Error message </small>
          </div>

          <div className="form-control" id='form-nation'>
            <label htmlFor="inputNation">País</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputNation" onChange={handleChange} name="nation" value={form.nation}>
                <option>{form.nation}</option>
                {Countries.map(data => {;
                  return <option value={data.country}>{data.country}</option>;
                })}
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallNation'> Error message </small>
          </div>

          <div className='form-control' id='form-region'>
            <label htmlFor="inputRegion">Ciudad</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputRegion" name="region" onChange={handleChange} maxLength={45} value={form.region}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallRegion'> Error message </small>
          </div>

          <div className='form-control' id='form-phonenumber'>
            <label htmlFor="inputPhonenumber">Celular</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputPhonenumber" name="phonenumber" placeholder='+51 999999999' maxLength={15} onChange={handleChange} value={form.phonenumber}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallPhonenumber'> Error message </small>
          </div>

          <div className='form-control' id='form-email'>
            <label htmlFor="inputEmail">Email</label>
            <div className="inputFormDiv">
              <Input
                type="email"
                onChange={handleChange}
                value={form.email}
                maxLength={60}
                autoComplete="new-email" 
                className="form-control" 
                id="inputEmail" 
                name="email"
              />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallEmail'> Error message </small>
          </div>

          <div className="form-control" id='form-password'>
            <label htmlFor="inputPassword">Contraseña</label>
            <div className="inputFormDiv">
              <Input
                type={passwordShown  ? "text" : "password"}
                onChange={handleChange}
                value={form.password}
                maxLength={20}
                autoComplete="new-password" 
                className="form-control" 
                id="inputPassword" 
                name={passwordShown  ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={()=>togglePassword()}
                    >
                      {passwordShown ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallPassword'> Error message </small>
          </div>

          <div className="form-control" id='form-repeat-password'>
            <label htmlFor="inputRepeatPassword">Repetir Contraseña</label>
            <div className="inputFormDiv">
              <Input
                type={passwordShownRepeat  ? "text" : "password"}
                maxLength={20}
                className="form-control" 
                id="inputRepeatPassword" 
                name={passwordShownRepeat  ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={()=>togglePasswordRepeat()}
                    >
                      {passwordShownRepeat ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallRepeatPassword'> Error message </small>
          </div>

          <div className='form-control' id='form-web'>
            <label htmlFor="inputWeb">Web</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputWeb" name="web" placeholder='https://holberton-peru.com' onChange={handleChange} maxLength={100} value={form.web} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallWeb'> Error message </small>
          </div>

          <div className='form-control' id='form-description'>
            <label htmlFor="inputDescription">Descripción</label>
            <div className='inputFormDiv'>
              <textarea className="form-control" id="inputDescription" rows="10" maxLength={1000} name="description" onChange={ handleChange } value={form.description} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallDescription'> Error message </small>
          </div>

          <div className="div-button-create-partner">
            <button
              type="submit"
              className="btn btn-primary m-3"
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
