import React, { useState } from "react";
import "./CrearAdminForm.css"
import swal from 'sweetalert';
import { useHistory } from "react-router";

// Form with empty string start
const initailForm = {
  firstname: "",
  lastname:"",
  email: "",
  password: ""
};

const CrudForm = ({ createData }) => {

  // Adding state to fill the form
  const history = useHistory();
  const [form, setForm] = useState(initailForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, 
    });
  };

  // Sweetalert to confirm when the user clicks in Crear nuevo hiring partner
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs() === true) {
      swal({
        title: "CREAR ADMINISTRADOR",
        text: `¿Está seguro de crear el nuevo administrador?`,
        buttons: ["Cancelar", "Si"],
      }).then((willCreate) => {
        if (willCreate) {
          createData(form);
          swal("HAS CREADO EXITOSAMENTE UN NUEVO ADMINISTRADOR", {
              timer:"1500"
          });
          setTimeout(() => {
            let path = `/admin/admins`; 
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

  // Validate form inputs
  function validateInputs() {
    let formIsValid = true;

    const Firstnamevalue = inputFirstname.value.trim();
    const formFirstname = document.getElementById('form-firstname');
    const errorFirstname = document.getElementById('smallFirstname');
  
    if (Firstnamevalue === "") {
      formFirstname.className = 'form-control error';
      errorFirstname.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u.test(Firstnamevalue))) {
      formFirstname.className = 'form-control error';
      errorFirstname.innerText = "Use solo letras.";
      formIsValid = false;
    } else {
      formFirstname.classList.remove('error');
    }

    const Lastnamevalue = inputLastname.value.trim();
    const formLastname = document.getElementById('form-lastname');
    const errorLastname = document.getElementById('smallLastname');
  
    if (Lastnamevalue === "") {
      formLastname.className = 'form-control error';
      errorLastname.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u.test(Lastnamevalue))) {
      formLastname.className = 'form-control error';
      errorLastname.innerText = "Use solo letras.";
      formIsValid = false;
    } else {
      formLastname.classList.remove('error');
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
    return formIsValid
  }

  return (
    <div className="container-profile-create-admin">
      <div className="profile-title">
        <h1>Agregar administrador</h1>
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

          <div className="div-button-create-admin">
            <button
              type="submit"
              className="btn btn-primary m-3"
              onClick={handleSubmit}
              value="Enviar"
            >
              Crear nuevo administrador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrudForm;
