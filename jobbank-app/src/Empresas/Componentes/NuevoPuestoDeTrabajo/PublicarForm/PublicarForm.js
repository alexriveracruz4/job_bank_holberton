import React, { useState, useEffect, useRef, useCallback } from 'react';
import Countries from "../../../../helpers/Countries.json"
import "./PublicarForm.css"
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import { useHistory } from 'react-router';
import apiPath from '../../../../ApiPath';


import Quill from 'quill';
import "quill/dist/quill.snow.css"

const cookies = new Cookies();
  
const CrudForm = ({ createData }) => {
  const history = useHistory();
  const PartnerId = cookies.get("partner_id"); //string variable

  // Form with empty string and with the id of the partner who will create it
  const initailForm = {
    partner_id: parseInt(PartnerId),
    id: '',
    title: '',
    country: '',
    city:'',
    pres_or_remote: '',
    experience: '',
    age_min: 0,
    age_max: 0,
    job_type: '',
    pres_or_remote: '',
    salary: '',
    travel_availability: '',
    code: '',
  };

  const [form, setForm] = useState(initailForm);

  useEffect(async() => {
    await obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const datos = await fetch(`${apiPath}/partners/${PartnerId}/jobs/`);
    const trabajos = await datos.json();
    const jobs = await trabajos.data;

    const firstid = []

    if (jobs.length === 0) { // If the partner does not have jobs created, an array will be created with id 1
      firstid.push(0)
      const PartnerJobId = PartnerId + "_" + (Math.max(...firstid) + 1) ; // This is to save it in code (Partnerid + _ + (First Jobid + 1))
      setForm({...form, id: Math.max(...firstid) + 1, code: PartnerJobId}) // Save the id and code in the form
    } else {  // it will look for the last id and create a new one with last id + 1
      const objects = jobs.map(jobs => jobs.id)
      const PartnerJobId = PartnerId + "_" + (Math.max(...objects) + 1) ; // This is to save it in code (Partnerid + _ + (Last Jobid + 1))
      setForm({...form, id: Math.max(...objects) + 1, code: PartnerJobId}) // Save the id and code in the form
    }
  }

  // This event fills the form every time a key is pressed
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

// Sweetalert to confirm when the user clicks in Guardar Cambios
const handleSubmit = (e) => {
  e.preventDefault();
  if (validateInputs() === true) {
    swal({
      title: "CREAR TRABAJO",
      text: `¿Está seguro de crear un nuevo empleo?`,
      buttons: ["Cancelar", "Si"],
    }).then((willEdit) => {
      if (willEdit) {
        createData(form);
        swal("HAS CREADO EXITOSAMENTE UN PUESTO DE TRABAJO", {
            timer:"1500"
          });
        setTimeout(() => {
          history.push(`/empresa/mis-puestos-de-trabajo/${form.id}`);
        }, 1000);
        window.scrollTo(0, 0);
      } 
    });
  };
};

  // Getting variables from html
  const inputTitle = document.getElementById('inputTitle');
  const inputCountry = document.getElementById('inputCountry');
  const inputCity = document.getElementById('inputCity');
  const inputExperience = document.getElementById('inputExperience');
  const inputAgeMin = document.getElementById('inputAgeMin');
  const inputAgeMax = document.getElementById('inputAgeMax');
  const inputJobType = document.getElementById('inputJobType');
  const inputPresOrRemote = document.getElementById('inputPresOrRemote');
  const inputTravelAvailability = document.getElementById('inputDipTravel');
  const inputDescription = document.getElementById('inputDescription');

  // Validate form inputs
  function validateInputs() {
    let formIsValid = true;

    const titlevalue = inputTitle.value.trim();
    const formTitle = document.getElementById('form-title');
    const errorTitle = document.getElementById('smallTitle');

    if (titlevalue === "") {
      formTitle.className = 'form-control error';
      errorTitle.innerText = "Complete este campo.";
      formIsValid = false;
    } else {
      formTitle.classList.remove('error');
    }

    const countryvalue = inputCountry.value.trim();
    const formCountry = document.getElementById('form-country');
    const errorCountry = document.getElementById('smallCountry');

    if (countryvalue === "") {
      formCountry.className = 'form-control error';
      errorCountry.innerText = "Complete este campo.";
      formIsValid = false;
    } else {
      formCountry.classList.remove('error');
    }

    const cityvalue = inputCity.value.trim();
    const formCity = document.getElementById('form-city');
    const errorCity = document.getElementById('smallCity');
  
    if (cityvalue === "") {
      formCity.className = 'form-control error';
      errorCity.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u.test(cityvalue))) {
      formCity.className = 'form-control error';
      errorCity.innerText = "Use solo letras.";
      formIsValid = false;
    } else {
      formCity.classList.remove('error');
    }

    const experiencevalue = inputExperience.value.trim();
    const formExperience = document.getElementById('form-experience');
    const errorExperience = document.getElementById('smallExperience');

    if (experiencevalue === "") {
      formExperience.classList.remove('error');
    } else {
      formExperience.classList.remove('error');
    }

    const JobTypeValue = inputJobType.value.trim();
    const formJobType = document.getElementById('form-job_type');
    const errorJobType = document.getElementById('smallJobType');

    if (JobTypeValue === "") {
      formJobType.className = 'form-control error';
      errorJobType.innerText = "Complete este campo.";
      formIsValid = false;
    } else {
      formJobType.classList.remove('error');
    }

    const PresOrRemoteValue = inputPresOrRemote.value.trim();
    const formPresOrRemote = document.getElementById('form-pres_or_remote');
    const errorPresOrRemote = document.getElementById('smallPresOrRemot');

    if (PresOrRemoteValue === "") {
      formPresOrRemote.className = 'form-control error';
      errorPresOrRemote.innerText = "Complete este campo.";
      formIsValid = false;
    } else {
      formPresOrRemote.classList.remove('error');
    }

    const TravelAvailabilityValue = inputTravelAvailability.value.trim();
    const formTravelAvailability = document.getElementById('form-travel_availability');
    const errorTravelAvailability = document.getElementById('smallTravelAvailability');

    if (TravelAvailabilityValue === "") {
      formTravelAvailability.className = 'form-control error';
      errorTravelAvailability.innerText = "Complete este campo.";
      formIsValid = false;
    } else {
      formTravelAvailability.classList.remove('error');
    }

    const DescriptionValue = inputDescription.value.trim();
    const formDescription = document.getElementById('form-description');
    const errorDescription = document.getElementById('smallDescription');

    if (DescriptionValue === "") {
      formDescription.className = 'form-control error';
      errorDescription.innerText = "Complete este campo.";
      formIsValid = false;
    } else {
      formDescription.classList.remove('error');
    }

    return formIsValid
  }

  var quill = new Quill('#editor-container', {
    modules: {
      toolbar: [
        ['bold', 'italic'],
        ['link', 'blockquote', 'code-block', 'image'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ]
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'
  });

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement('div')
    const p = document.createElement('p')
    const textP = document.createTextNode("This is a new paragraph.");
    p.appendChild(textP);
    editor.append(p)
    wrapper.append(editor)
    new Quill(editor, {theme: "snow"})
  }, [])


  return (
    <div className="container-profile-job">
      <div className="profile-title">
        <h1>Crear puesto de trabajo</h1>
      </div>

      <div className='container-form'>
        <form className='form'>

          <div className="form-control" id='form-title'>
            <label htmlFor="inputTitle">Título</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputTitle" maxLength={100} name="title" onChange={handleChange} value={form.title}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallTitle'> Error message </small>
          </div>

          <div className='form-control' id='form-country'>
            <label htmlFor="inputCountry">País</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputCountry" onChange={handleChange} name="country" value={form.country}>
                <option>{form.country}</option>
                {Countries.map(data => {;
                  return <option value={data.country}>{data.country}</option>;
                })}
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallCountry'> Error message </small>
          </div>

          <div className="form-control" id='form-city'>
            <label htmlFor="inputCity">Ciudad</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputCity" maxLength={45} name="city" onChange={handleChange} value={form.city}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallCity'> Error message </small>
          </div>

          <div className="form-control" id='form-experience'>
            <label htmlFor="inputExperience">Tiempo de experiencia</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputExperience" maxLength={45} name="experience" placeholder="2 años" onChange={handleChange} value={form.experience}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallExperience'> Error message </small>
          </div>

          <div className="form-control" id='form-salary'>
            <label htmlFor="inputSalary">Salario en dólares</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputSalary" name="salary" placeholder="1000 dólares" maxLength={45} onChange={handleChange} value={form.salary} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallSalary'> Error message </small>
          </div>

          <div className="form-control" id='form-job_type'>
            <label htmlFor="inputJobType">Jornada</label>
            <div className="inputFormDiv">
              <select className="form-control" id="inputJobType" onChange={handleChange} name="job_type" value={form.job_type}>
                <option></option>
                <option value="Tiempo completo">Tiempo completo</option>
                <option value="Tiempo parcial">Tiempo parcial</option>
                <option value="Por horas">Por horas</option>
                <option value="Por proyecto">Por proyecto</option>
              </select>
            </div>
            <small id='smallJobType'> Error message </small>
          </div>

          <div className="form-control" id='form-pres_or_remote'>
            <label htmlFor="inputPresOrRemote">Remoto o presencial</label>
            <div className="inputFormDiv">
              <select className="form-control" id="inputPresOrRemote" onChange={handleChange} name="pres_or_remote" value={form.pres_or_remote}>
                <option></option>
                <option value="Sin preferencia">Sin preferencia</option>
                <option value="Presencial">Presencial</option>
                <option value="Remoto">Remoto</option>
                <option value="Semi-presencial">Semi-presencial</option>
              </select>
            </div>
            <small id='smallPresOrRemot'> Error message </small>
          </div>

          <div className="form-control" id='form-travel_availability'>
            <label htmlFor="inputDispTravel">Disponibilidad para viajar</label>
            <div className="inputFormDiv">
              <select className="form-control" id="inputDipTravel" onChange={handleChange} name="travel_availability" value={form.travel_availability}>
                <option></option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>
            <small id='smallTravelAvailability'> Error message </small>
          </div>

          {/*<div className='form-control' id='form-description'>
            <label htmlFor="inputDescription">Descripción</label>
            <div className='inputFormDiv'>
              <textarea className="form-control" id="inputDescription" rows="10" maxLength={3000} name="description" onChange={ handleChange } value={form.description} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallDescription'> Error message </small>
              </div>*/}

          <div className='form-control' id='form-description'>
            <label htmlFor="inputDescription">Descripción del trabajo</label>
            <div className='inputFormDiv'>
              <input name="description" type="hidden" />
              <div className='containerEditText' ref={wrapperRef}></div>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallDescription'> Error message </small>
          </div>

          <div className="div-button-editar-empresa">
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
}

export default CrudForm;