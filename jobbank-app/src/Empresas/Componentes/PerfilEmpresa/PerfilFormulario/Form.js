import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import Countries from "../../../data/country.json"
import UserIcon from "../../../Navegador/ImagenesNav/user-icon.png"
import "./Form.css"
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import apiPath from '../../../../ApiPath';

const cookies = new Cookies();

// Form with empty string at the beginning
const initailForm = {
  name: "",
  nation: "",
  region: "",
  phonenumber: "",
  email: "",
  web: "",
  description:""
};

// Adding state to fill the form with the data received from dataToEdit
const CrudForm = ({ updateData, dataToEdit }) => {
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

  let partner_id = cookies.get('id')

  const obtenerDatosDePartners = async () => {
    const data = await fetch(`${apiPath}/partners/${partner_id}`);
    const applications = await data.json();
    setPartner(applications);
  }

  useEffect(() => {
  let photoname = "";

  if (partner.photo_filename_physical != null && partner.photo_filename_physical != undefined){
    photoname = partner.photo_filename_physical;
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
        title: "EDITAR PERFIL",
        text: `¿Está seguro de guardar los cambios realizados?`,
        buttons: ["Cancelar", "Guardar"],
      }).then((willEdit) => {
        if (willEdit) {

          // updateData function
          async function updateForm() {
            await updateData(form);
          
          if (uploadInputImage.files[0] != undefined || uploadInputImage.files[0] != null) {
            setTimeout(() => {
                const data = new FormData();
                data.append('file', uploadInputImage.files[0]);
                const urlupload = `${apiPath}/partners/`+ cookies.get('id') + '/uploadphoto'
    
                fetch(urlupload, {
                  method: 'POST',
                  body: data,
                }).then((response) => {
                  response.json().then((body) => {
                    cookies.set('logo_filename_physical', body.logo_filename_physical);
                  });
                })
            }, 500);
          };

          cookies.set('name', form.name, {path:"/"});

          swal("HAS EDITADO EXITOSAMENTE TU PERFIL", {
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
  const inputName = document.getElementById('inputName');
  const inputRegion = document.getElementById('inputRegion');
  const inputPhonenumber = document.getElementById('inputPhonenumber');
  const inputEmail = document.getElementById('inputEmail');
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

  const webvalue = inputWeb.value.trim();
  const formWeb = document.getElementById('form-web')
  const errorWeb = document.getElementById('smallWeb')

  if (!(/^(?=.{0,70}$)\S*$/.test(webvalue))){
    formWeb.className = 'form-control error';
    errorWeb.innerText = "Por favor ingrese máximo 70 caracteres";
  } else {
    formWeb.classList.remove('error');
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
    <div className="container-profile-partner">
      <div className="profile-title">
        <h1>Editar mi información</h1>
      </div>

      <div className='container-form'>
        <form className='form'>

          <div className='form-control'>
            <div className="form-Estudiante">
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

          <div className="form-control" id='form-name'>
            <label htmlFor="inputName">Empresa</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputName" name="name" onChange={handleChange} maxLength={45} value={form.name}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallName'> Error message </small>
          </div>

          <div className='form-control'>
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
            <small> Error message </small>
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
              <input type="email" className="form-control" id="inputEmail" name="email" onChange={handleChange} maxLength={45} value={form.email} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallEmail'> Error message </small>
          </div>

          <div className='form-control' id='form-web'>
            <label htmlFor="inputWeb">Web</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputWeb" name="web" onChange={handleChange} maxLength={70} value={form.web} />
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

          <div className="div-button-editar-empresa">
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
