import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router';
import Cookies from 'universal-cookie';
import Countries from "../../../data/country.json"
import UserIcon from "../../../Navegador/ImagenesNav/user-icon.png"
import "./Form.css"
import swal from 'sweetalert';
import apiPath from '../../../../ApiPath';

const cookies = new Cookies();

// Form with empty string at the beginning
const initailForm = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  phonenumber: '',
  age: '',
  nationality: '',
  availability: '',
  pres_or_remot: '',
  disp_travel: '',
  linkedin: '',
  github: '',
  twitter: '',
  description: '',
};

// Update the student with the updateData arrow function
const CrudForm = ({ updateData, dataToEdit}) => {
  const [form, setForm] = useState(initailForm);

  useEffect(() => {
    setForm(dataToEdit);
  }, [dataToEdit]);

  // This event fills the form every time a key is pressed
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Sweetalert to confirm when the user clicks in Guardar Cambios
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs() === true) {
      swal({
        title: "EDITAR PERFIL",
        text: `¿Está seguro de guardar los cambios realizados?`,
        buttons: ["Cancelar", "Guardar"],
      }).then((willEdit) => {
        if (willEdit) {
          updateData(form);
          cookies.set('firstname', form.firstname, {path:"/"});
  
          cookies.set('lastname', form.lastname, {path:"/"});
  
          swal("HAS EDITADO EXITOSAMENTE TU PERFIL", {
              timer:"1500"
          });
          setTimeout(() => {
            history.go(0);
          }, 1000);
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

  // validacion formulario

  const inputFirstname = document.getElementById('inputFirstname');
  const inputLastname = document.getElementById('inputLastname');
  const inputEmail = document.getElementById('inputEmail');
  const inputCellphone = document.getElementById('inputCellphone');
  const inputAge = document.getElementById('inputAge');
  const inputAvailability = document.getElementById('inputAvailability');
  const inputPresOrRemote= document.getElementById('inputPresOrRemote');
  const inputNationality = document.getElementById('inputNationality');
  const inputDiptravel = document.getElementById('inputDiptravel');
  const inputLinkedIn = document.getElementById('inputLinkedIn');
  const inputGithub = document.getElementById('inputGithub');
  const inputTwitter = document.getElementById('inputTwitter');
  const inputDescription = document.getElementById('inputDescription');

  // mio

  function validateInputs() {
    let formIsValid = true;

    const firstnamevalue = inputFirstname.value.trim();
    const formFirstname = document.getElementById('form-firstname');
    const errorFirstname = document.getElementById('smallFirstname');

    if (firstnamevalue === "") {
      formFirstname.className = 'form-control error';
      errorFirstname.innerText = "Completa este campo.";
      formIsValid = false;
    } else if (!(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u.test(firstnamevalue))) {
      formFirstname.className = 'form-control error';
      errorFirstname.innerText = "Usa solo letras.";
      formIsValid = false;
    } else {
      formFirstname.classList.remove('error');
    }

    const lastnamevalue = inputLastname.value.trim();
    const formLastname = document.getElementById('form-lastname');
    const errorLastname = document.getElementById('smallLastname');

    if (lastnamevalue === "") {
      formLastname.className = 'form-control error';
      errorLastname.innerText = "Completa este campo.";
      formIsValid = false;
    } else if (!(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u.test(lastnamevalue))) {
      formLastname.className = 'form-control error';
      errorLastname.innerText = "Usa solo letras.";
      formIsValid = false;
    } else {
      formLastname.classList.remove('error');
    }

    const emailvalue = inputEmail.value.trim();
    const formEmail = document.getElementById('form-email')
    const errorEmail = document.getElementById('smallEmail')

    if (emailvalue === "") {
      formEmail.className = 'form-control error';
      errorEmail.innerText = "Completa este campo.";
      formIsValid = false;
    } else if (!(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(emailvalue))) {
      formEmail.className = 'form-control error';
      errorEmail.innerText = "Por favor ingrese un email válido";
      formIsValid = false;
    } else {
      formEmail.classList.remove('error');
    }

    const cellphonevalue = inputCellphone.value.trim();
    const formCellphone = document.getElementById('form-cellphone');
    const errorCellphone = document.getElementById('smallCellphone');

    if (cellphonevalue === "") {
      formCellphone.className = 'form-control error';
      errorEmail.innerText = "Completa este campo."
      formIsValid = false;
    } else if (!(/^\+?\(?\d{1,3}\)?[\s.-]?\d{3}[\s.-]?\d{3,6}$/im.test(cellphonevalue))) {
      formCellphone.className = 'form-control error';
      errorCellphone.innerText = "Sólo puedes ingresar números.";
      formIsValid = false;
    } else {
      formCellphone.classList.remove('error');
    }

    const agevalue = inputAge.value.trim();
    const ageintvalue = parseInt(agevalue)
    const formAge = document.getElementById('form-age');
    const errorAge = document.getElementById('smallAge');

    if (ageintvalue === 0) {
      formAge.className = 'form-control error';
      errorAge.innerText = "Completa este campo.";
      formIsValid = false;
    } else if (!(/^[1-9][0-9]{1}$|^99$/.test(ageintvalue))) {
      formAge.className = 'form-control error';
      errorAge.innerText = "Ingrese una edad válida"
      formIsValid = false;
    } else if (typeof(ageintvalue) === "string") { 
      formAge.className = 'form-control error';
      errorAge.innerText = "Sólo puedes ingresar números."
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
      errorAvailability.innerText = "Completa este campo.";
      formIsValid = false;
    } else if (!(arrayoptions.includes(availabvalue))) {
      formAvailability.className = 'form-control error';
      errorAvailability.innerText = "Ingrese Disponible a nuevas ofertas"
      formIsValid = false;
    } else {
      formAvailability.classList.remove('error');
    }

    return formIsValid
  }
  
  const [imageURL, setImageURL] = useState();
  let uploadInput = useRef();

  const handleUploadImage = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', uploadInput.files[0]);
    const urlupload = `${apiPath}/students/`+ cookies.get('id') + '/uploadphoto'

    fetch(urlupload, {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        cookies.set('cv_filename_physical', body.cv_filename_physical);
        imageURL(`http://localhost:5000/${body.file}`);
      });
    });
  }

  return (
    <div className="container-profile">
      <div className="header-profile">
        <h1>Editar mi perfil</h1>
      </div>
      {/* new form without bootstrap */}
      <div className='container-form'>
        <form className='form'>
          {/* Photo */}
          <div className='form-control'>
            <div className="form-Estudiante">
              <div className="form-div">
                <form onSubmit={ handleUploadImage } className="form-form">
                  <div className="photoform-div">
                    <label htmlFor="inputPhoto" className="col-form-label">Foto de perfil</label>
                    <div className='usericon-div'>
                      <img src={ UserIcon } className="usericon-form" alt="imagen de usuario" />
                    </div>
                    <small id="photoHelpInline" className="text-muted">Please upload a square-shaped picture. Max 2MB, Formats allowed: jpg, png.</small>
                    <div className="container-selectFile">
                      <div className="box-photo form-control">
                        <input ref={(ref) => { uploadInput = ref; }} type="file" />
                        <button>Cargar</button>
                      </div>
                      <div className="cv-name">
                        <a href={cookies.get("photo_filename_logical")}>{cookies.get('photo_filename_physical')}</a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className='form-control' id='form-firstname'>
            <label htmlFor="inputFirstname">Nombre</label>
            <div className='inputFormDiv'>
              <input type="text" className="form-control" id="inputFirstname" name="firstname" onChange={handleChange} value={form.firstname} maxLength={45}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallFirstname'> Error message </small>
          </div>

          <div className='form-control' id='form-lastname'>
            <label htmlFor="inputLastname">Apellidos</label>
            <div className='inputFormDiv'>
              <input type="text" className="form-control" id="inputLastname" name="lastname" onChange={handleChange} value={form.lastname} maxLength={45}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallLastname'> Error message </small>
          </div>

          <div className='form-control' id='form-email'>
            <label htmlFor="inputEmail">Email</label>
            <div className='inputFormDiv'>
              <input type="email" className="form-control" id="inputEmail" name="email" onChange={handleChange} value={form.email} maxLength={45}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallEmail'> Error message </small>
          </div>

          <div className='form-control' id='form-cellphone'>
            <label htmlFor="inputCellphone">Celular</label>
            <div className='inputFormDiv'>
              <input type="tel" className="form-control" id="inputCellphone" name="phonenumber" onChange={handleChange} value={form.phonenumber} maxLength={15} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallCellphone'> Error message </small>
          </div>

          <div className='form-control' id='form-age'>
            <label htmlFor="inputAge">Edad</label>
            <div className='inputFormDiv'>
              <input type="tel" className="form-control" id="inputAge" name="age" maxLength={2} onChange={handleChange} value={form.age} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallAge'> Error message </small>
          </div>

          <div className='form-control' id='form-availability'>
            <label htmlFor="inputAvailability">Estado actual</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputAvailability" onChange={handleChange} name="availability" value={form.availability}>
                <option selected disabled hidden></option>
                <option onClick={e => e.target.textarea}>Disponible a nuevas ofertas de trabajo</option>
                <option onClick={e => e.target.textarea}>No tengo empleo</option>
                <option onClick={e => e.target.textarea}>Estoy trabajando actualmente</option>
                <option onClick={e => e.target.textarea}>No tengo ningún interés en un nuevo empleo</option>
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
                <option value="Presencial">Presencial</option>
                <option value="Remoto">Remoto</option>
                <option value="Semi-presencial">Semi-presencial</option>
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small> Error message </small>
          </div>

          <div className='form-control'>
            <label htmlFor="inputNationality">País</label>
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
            <small> Error message </small>
          </div>

          <div className='form-control'>
            <label htmlFor="inputDisptravel">Disponibilidad para viajar</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputDiptravel" onChange={handleChange} name="disp_travel" value={form.disp_travel}>
                <option selected disabled hidden>{form.disp_travel}</option>
                <option value="Disponible">Disponible</option>
                <option value="No disponible">No disponible</option>
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small> Error message </small>
          </div>

          <div className='form-control'>
            <label htmlFor="inputLinkedIn">LinkedIn</label>
            <div className='inputFormDiv'>
              <input type="url" className="form-control" id="inputLinkedIn" name="linkedin" placeholder='https://www.linkedin.com/in/nombredeusuario' onChange={handleChange} maxLength={70} value={form.linkedin} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small> Error message </small>
          </div>

          <div className='form-control'>
            <label htmlFor="inputGithub">Github</label>
            <div className='inputFormDiv'>
              <input type="text" className="form-control" id="inputGithub" name="github" placeholder='https://github.com/nombredeusuario' onChange={handleChange} maxLength={70} value={form.github} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small> Error message </small>
          </div>

          <div className='form-control'>
            <label htmlFor="inputTwitter">Twitter</label>
            <div className='inputFormDiv'>
              <input type="text" className="form-control" id="inputTwitter" name="twitter" placeholder='https://twitter.com/nombredeusuario' pattern="https://.*" onChange={handleChange} maxLength={70} value={form.twitter} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small> Error message </small>
          </div>

          <div className='form-control'>
            <label htmlFor="inputDescription">Descripción</label>
            <div className='inputFormDiv'>
              <textarea className="form-control" id="inputDescription" rows="10" maxLength={1000} name="description" onChange={ handleChange } value={form.description} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small> Error message </small>
          </div>

          <UploadCv />



          <div className='form-control'>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={handleSubmit}
              onClickCapture
              value="Enviar">Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CrudForm;

class UploadCv extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  // Event that uploads the curriculum
  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    const urlupload = `${apiPath}/students/`+ cookies.get('id') + '/uploadcv'

    fetch(urlupload, {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        cookies.set('cv_filename_physical', body.cv_filename_physical);
        this.setState({ imageURL: `http://localhost:5000/${body.file}` });
      });
    });
  }

  render() {
    return (
      <div className='form-control'>
        <div className="form-Estudiante">
          <div className="form-div">
            <form onSubmit={this.handleUploadImage} className="form-form">
              <div className="form-group row">
                <label htmlFor="inputPhoto" className="col-form-label">Subir CV</label>
                <div className="container-selectFile">
                  <div className="box-photo form-control">
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                    <button>Cargar</button>
                  </div>
                  <div className="cv-name">
                    <a href={cookies.get("cv_filename_logical")}>{cookies.get('cv_filename_physical')}</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export { UploadCv };
