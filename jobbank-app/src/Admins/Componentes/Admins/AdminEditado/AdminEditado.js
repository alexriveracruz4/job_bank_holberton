import React, { useState, useEffect } from "react";
import "./AdminEditado.css"
import Cookies from "universal-cookie";
import { useHistory } from "react-router";
import swal from 'sweetalert';

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

  // Sweetalert to confirm when the user clicks in Guardar cambios
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs() === true) {
      swal({
        title: "EDITAR ADMIN",
        text: `¿Está seguro de guardar los nuevos cambios realizados en el admin "${dataToEdit.firstname} ${dataToEdit.lastname}"?`,
        buttons: ["Cancelar", "Guardar"],
      }).then((willEdit) => {
        if (willEdit) {
          updateData(form);
          cookies.set('firstname', form.firstname, {path:"/"});
          cookies.set('lastname', form.lastname, {path:"/"});
          swal("HAS EDITADO EXITOSAMENTE LOS DATOS DEL ADMIN", {
              timer:"1500"
          });
          setTimeout(() => {
            history.go(0);
          }, 1000);
        }
      });
    };
  };

  // Getting variables from html
  const inputFirstname = document.getElementById('inputFirstname');
  const inputLastname = document.getElementById('inputLastname');
  const inputEmail = document.getElementById('inputEmail');
  const inputPassword = document.getElementById('inputPassword');

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

  return formIsValid
}

  return (
    <div className="container-profile-admin-edit">
      <div className="profile-title">
        <h1>Editar perfil</h1>
      </div>

      <div className='container-form'>
        <form className='form'>

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
              <input type="email" className="form-control" id="inputEmail" name="email" onChange={handleChange} maxLength={45} value={form.email} />
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
