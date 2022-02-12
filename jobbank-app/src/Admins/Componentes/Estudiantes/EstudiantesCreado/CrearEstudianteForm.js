import React, { useState, useEffect } from "react";
import "./CrearEstudianteForm.css";
import Countries from "../data/country.json";
import Cookies from "universal-cookie";
import swal from 'sweetalert';
import { useHistory } from "react-router";


const cookies = new Cookies();

const CrudForm = ({ createData }) => {

  // Declaring variables to use useHistory and admin cookies
  const history = useHistory();
  const AdminID = cookies.get("admin_id");

  // Form with empty string and with the id of the admin who will create it
  const initailForm = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: "",
    nationality: "",
    province: "",
    availability: "",
    pres_or_remot: "",
    created_by: parseInt(AdminID),
    updated_by: parseInt(AdminID),
  };

  // Adding state to fill the form
  const [form, setForm] = useState(initailForm);

  // This event fills the form every time a key is pressed
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Sweetalert to confirm when the user clicks in Crear nuevo estudiante
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs() === true) {
      swal({
        title: "CREAR ESTUDIANTE",
        text: `¿Está seguro de crear el nuevo estudiante?`,
        buttons: ["Cancelar", "Si"],
      }).then((willCreate) => {
        if (willCreate) {
          createData(form);
          swal("HAS CREADO EXITOSAMENTE UN NUEVO ESTUDIANTE", {
              timer:"1500"
          });
          setTimeout(() => {
            let path = `/admin/estudiantes`; 
            history.push(path);
          }, 1000);
          window.scrollTo(0, 0);
        }
      });
    };
  };

  // Getting variables from html

  const inputFirstname = document.getElementById('inputFirstname');
  const inputLastname = document.getElementById('inputLastname');
  const inputEmail = document.getElementById('inputEmail');
  const inputPassword = document.getElementById('inputPassword');
  const inputRepeatPassword = document.getElementById('inputRepeatPassword');
  const inputPhonenumber = document.getElementById('inputPhonenumber');
  const inputAge = document.getElementById('inputAge');
  const inputNationality = document.getElementById('inputNationality');
  const inputAvailability = document.getElementById('inputAvailability');

  // Validate form inputs

  function validateInputs() {
    let formIsValid = true;
  
    //arreglar esto
    const firstnamevalue = null;
    if (inputFirstname != null && inputFirstname != "") {
      const firstnamevalue = inputFirstname.value.trim();
    } else {
      formFirstname.className = 'form-control error';
      errorFirstname.innerText = "Complete este campo.";
      formIsValid = false;
    }
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
      formPassword.className = 'form-control error';
      errorPassword.innerText = "Complete este campo.";
      formIsValid = false;
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

    const nationalityvalue = inputNationality.value.trim();
    const formNationality = document.getElementById('form-nationality');
    const errorNationality = document.getElementById('smallNationality');

    if (nationalityvalue === "") {
      formNationality.className = 'form-control error';
      errorNationality.innerText = "Complete este campo.";
      formIsValid = false;
    } else {
      formPassword.classList.remove('error');
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

    const agevalue = inputAge.value.trim();
    const ageintvalue = parseInt(agevalue)
    const formAge = document.getElementById('form-age');
    const errorAge = document.getElementById('smallAge');

    if (ageintvalue === 0) {
      formAge.className = 'form-control error';
      errorAge.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(/^[1-9][0-9]{1}$|^99$/.test(ageintvalue))) {
      formAge.className = 'form-control error';
      errorAge.innerText = "Ingrese una edad válida"
      formIsValid = false;
    } else if (typeof(ageintvalue) === "string") { 
      formAge.className = 'form-control error';
      errorAge.innerText = "Solo puedes ingresar números."
      formIsValid = false;
    } else {
      formAge.classList.remove('error');
    }

    const availabvalue = inputAvailability.value.trim();
    const formAvailability = document.getElementById('form-availability')
    const errorAvailability = document.getElementById('smallAvailability')
    const selectfor = document.getElementById('inputAvailability');
    const arrayoptions = []
    for (var i = 0; i < selectfor.options.length; i++) {
      arrayoptions.push(selectfor.options[i].value);
    }

    if (availabvalue === "") {
      formAvailability.className = 'form-control error';
      errorAvailability.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(arrayoptions.includes(availabvalue))) {
      formAvailability.className = 'form-control error';
      errorAvailability.innerText = "Ingrese una opcion del menú desplegable"
      formIsValid = false;
    } else {
      formAvailability.classList.remove('error');
    }

    return formIsValid
  }

  return (
    <div className="container-profile-create-student">
      <div className="profile-title">
        <h1>Agregar estudiante</h1>
      </div>

      <div className='container-form'>
        <form className='form'>

          <div className='form-control' id='form-firstname'>
            <label htmlFor="inputFirstname">Nombre (*obligatorio)</label>
            <div className='inputFormDiv'>
              <input type="text" className="form-control" id="inputFirstname" name="firstname" onChange={handleChange} value={form.firstname} maxLength={45}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallFirstname'> Error message </small>
          </div>

          <div className='form-control' id='form-lastname'>
            <label htmlFor="inputLastname">Apellidos (*obligatorio)</label>
            <div className='inputFormDiv'>
              <input type="text" className="form-control" id="inputLastname" name="lastname" onChange={handleChange} value={form.lastname} maxLength={45}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallLastname'> Error message </small>
          </div>

          <div className='form-control' id='form-email'>
            <label htmlFor="inputEmail">Email (*obligatorio)</label>
            <div className='inputFormDiv'>
              <input type="email" className="form-control" id="inputEmail" name="email" onChange={handleChange} value={form.email} maxLength={60}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallEmail'> Error message </small>
          </div>

          <div className="form-control" id='form-password'>
            <label htmlFor="inputPassword">Contraseña (*obligatorio)</label>
            <div className="inputFormDiv">
              <input type="password" className="form-control" id="inputPassword" name="password" onChange={handleChange} maxLength={20} value={form.password}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallPassword'> Error message </small>
          </div>

          <div className="form-control" id='form-repeat-password'>
            <label htmlFor="inputRepeatPassword">Repetir Contraseña (*obligatorio)</label>
            <div className="inputFormDiv">
              <input type="password" className="form-control" id="inputRepeatPassword" name="password" maxLength={20}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallRepeatPassword'> Error message </small>
          </div>

          <div className='form-control' id='form-phonenumber'>
            <label htmlFor="inputPhonenumber">Celular</label>
            <div className='inputFormDiv'>
              <input type="tel" className="form-control" id="inputPhonenumber" name="phonenumber" onChange={handleChange} value={form.phonenumber} maxLength={15} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallPhonenumber'> Error message </small>
          </div>

          <div className='form-control' id='form-age'>
            <label htmlFor="inputAge">Edad (*obligatorio)</label>
            <div className='inputFormDiv'>
              <input type="tel" className="form-control" id="inputAge" name="age" maxLength={2} onChange={handleChange} value={form.age} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallAge'> Error message </small>
          </div>

          <div className='form-control' id='form-nationality'>
            <label htmlFor="inputNationality">País (*obligatorio)</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputNationality" onChange={handleChange} name="nationality" value={form.nationality}>
                <option>{form.nationality}</option>
                {Countries.map(data => {;
                  return <option value={data.country}>{data.country}</option>;
                })}
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallNationality'> Error message </small>
          </div>

          <div className='form-control' id='form-province'>
            <label htmlFor="inputProvine">Ciudad</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputProvince" name="province" onChange={handleChange} maxLength={45} value={form.province}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallProvince'> Error message </small>
          </div>

          <div className='form-control' id='form-availability'>
            <label htmlFor="inputAvailability">Estado actual (*obligatorio)</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputAvailability" onChange={handleChange} name="availability" value={form.availability}>
                <option selected disabled hidden></option>
                <option onClick={e => e.target.textarea}>Actualmente trabajando</option>
                <option onClick={e => e.target.textarea}>En busca de ofertas laborales</option>
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallAvailability'> Error message </small>
          </div>

          <div className='form-control'>
            <label htmlFor="inputPresOrRemote">Modo de trabajo de preferencia</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputPresOrRemote" onChange={handleChange} name="pres_or_remot" value={form.pres_or_remot}>
                <option selected disabled hidden></option>
                <option value="Sin preferencia">Sin preferencia</option>
                <option value="Presencial">Presencial</option>
                <option value="Remoto">Remoto</option>
                <option value="Semi-presencial">Semi-presencial</option>
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small> Error message </small>
          </div>

          <div className="div-button-create-partner">
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={handleSubmit}
              value="Enviar"
            >
              Crear nuevo estudiante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrudForm;
