import React, { useState } from "react";
import "./CrearEmpresaForm.css"
import Countries from "../../../../helpers/Countries.json"
import swal from 'sweetalert';
import { useHistory } from "react-router";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Form with empty string start
const AdminID = cookies.get("admin_id");

const initailForm = {
  name: "",
  description:"",
  email: "",
  nation: "",
  phonenumber: "",
  region: "",
  web: "",
  password: "",
  created_by: parseInt(AdminID),
  updated_by: parseInt(AdminID),
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
        title: "CREAR EMPRESA",
        text: `¿Está seguro de crear la nueva empresa?`,
        buttons: ["Cancelar", "Si"],
      }).then((willCreate) => {
        if (willCreate) {
          createData(form);
          swal("HAS CREADO EXITOSAMENTE UNA NUEVA EMPRESA", {
              timer:"1500"
          });
          setTimeout(() => {
            let path = `/admin/empresas`; 
            history.push(path);
          }, 1000);
          window.scrollTo(0, 0);
        }
      });
    };
  };

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
  
    const webvalue = inputWeb.value.trim();
    const formWeb = document.getElementById('form-web')
    const errorWeb = document.getElementById('smallWeb')
  
    if (!(/^(?=.{0,100}$)\S*$/.test(webvalue))){
      formWeb.className = 'form-control error';
      errorWeb.innerText = "Por favor ingrese máximo 100 caracteres";
    } else {
      formWeb.classList.remove('error');
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
    <div className="container-profile-create-partner">
      <div className="profile-title">
        <h1>Crear hiring partner</h1>
      </div>

      <div className='container-form'>
        <form className='form'>

          <div className="form-control" id='form-name'>
            <label htmlFor="inputName">Empresa (*obligatorio)</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputName" name="name" onChange={handleChange} maxLength={60} value={form.name}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallName'> Error message </small>
          </div>

          <div className="form-control" id='form-nation'>
            <label htmlFor="inputNation">País (*obligatorio)</label>
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
            <label htmlFor="inputEmail">Email (*obligatorio)</label>
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

          <div className='form-control' id='form-web'>
            <label htmlFor="inputWeb">Web</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputWeb" name="web" onChange={handleChange} maxLength={100} value={form.web} />
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
              className="btn btn-primary mt-3"
              onClick={handleSubmit}
              value="Enviar">Crear nuevo hiring partner
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default CrudForm;
