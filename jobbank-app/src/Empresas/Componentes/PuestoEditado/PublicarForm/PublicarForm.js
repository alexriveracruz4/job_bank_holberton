import React, { useState, useEffect, useCallback } from 'react';
import Countries from "../../../../helpers/Countries.json"
import "./PublicarForm.css"
import swal from 'sweetalert';
import { useHistory } from 'react-router';

import Quill from 'quill';
import "quill/dist/quill.snow.css"


const CrudForm = ({ updateData, dataToEdit}) => {
  const history = useHistory();
  const initailForm = {
    title: '',
    country: '',
    city:'',
    pres_or_remote: '',
    experience: '',
    travel_availability: '',
    age_min: 0,
    age_max: 0,
    salary: '',
    job_type: '',
    description: '',
  };

  // Gets the partner data and saves it in dataToEdit
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs() === true) {
      swal({
        title: "EDITAR TRABAJO",
        text: `¿Está seguro de editar el empleo "${form.title}"?`,
        buttons: ["Cancelar", "Si"],
      }).then((willEdit) => {
        if (willEdit) {
          updateData(form);
          swal("HAS EDITADO EXITOSAMENTE ESTE PUESTO DE TRABAJO", {
              timer:"1500"
            });
          setTimeout(() => {
            history.go(0);
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
        formCity.classList.remove('error');
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
  
      var justHtml = quill.root.innerHTML;
      form.description = justHtml
      //var justHtml = quill.root.innerHTML;
      //description.value = justHtml

      if (form.description === "<p><br></p>") {
        formDescription.className = 'form-control error';
        errorDescription.innerText = "Complete este campo.";
        formIsValid = false;
      } else {
        formDescription.classList.remove('error');
      }
      return formIsValid
    }

  var Size = Quill.import('attributors/style/size');
  Size.whitelist = ['14px', '16px', '18px'];
  Quill.register(Size, true);

  let toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['link'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'size': ['14px', '16px', '18px'] }],
  ];

  const [quill, setQuill] = useState("");
  const [counter, setCounter] = useState(0);

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement('div')
    wrapper.append(editor)
    const q = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    });
    setQuill(q)
  }, [])

  useEffect(() => {
    if (quill !== null) {
      if (quill.root !== undefined) {
        quill.root.innerHTML = form.description
        var limit = 3000;

        var container = document.querySelector('#counter');
        quill.on('text-change', function (delta, old, source) {
          if (quill.getLength() > limit) {
            quill.deleteText(limit, quill.getLength());
            container.innerText = "se alcanzó el límite de 3000 caracteres"
          } else {
            container.innerText = quill.getLength() - 1
            return
          }
        });
      } else {
        return
      }
    }
  });

  function testSubmit (e) {
    e.preventDefault();
    // Populate hidden form on submit
    //const description = document.querySelector('input[name=description]');
    //description.value = JSON.stringify(quill.getContents());
    var justHtml = quill.root.innerHTML;
    setForm({
      ...form,
      ["description"]: justHtml,
    });
  };

  return (
    <div className="container-profile-job-edit">
      <div className="profile-title">
        <h1>Editar puesto de trabajo</h1>
      </div>

      <div className='container-form'>
        <form className='form'>

          <div className="form-control" id='form-title'>
            <label htmlFor="inputTitle">Título</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputTitle" name="title" maxLength={100} onChange={handleChange} value={form.title}/>
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
                  return <option key={data.id} value={data.country}>{data.country}</option>;
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

          <div className='form-control' id='form-experience'>
            <label htmlFor="inputExperience">Tiempo de experiencia</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputExperience" onChange={handleChange} name="experience" value={form.experience}>
                <option selected disabled hidden></option>
                <option value="1 año">1 año</option>
                <option value="2 años">2 años</option>
                <option value="3 o 4 años">3 o 4 años</option>
                <option value="Más de 4 años">Más de 4 años</option>
                <option value="Sin experiencia">Sin experiencia</option>
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallExperience'> Error message </small>
          </div>

          <div className="form-control" id='form-salary'>
            <label htmlFor="inputSalary">Salario en dólares</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputSalary" name="salary" maxLength={45} placeholder="1500" onChange={handleChange} value={form.salary} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallSalary'> Error message </small>
          </div>

          <div className="form-control" id='form-job_type'>
            <label htmlFor="inputJobType">Jornada</label>
            <div className="inputFormDiv">
              <select className="form-control" id="inputJobType" onChange={handleChange} name="job_type" value={form.job_type}>
                <option selected disabled hidden></option>
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
                <option selected disabled hidden></option>
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
                <option selected disabled hidden></option>
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
              <input className="form-control" name="description" id="inputDescription" type="hidden" value={form.description} onChange={ handleChange } />
              <div className='containerEditText' ref={wrapperRef}></div>
              <div id="counter" onChange={e => setCounter(e.target.value.length)}>{counter}</div>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallDescription'> Error message </small>
          </div>
          {/*<button onClick={testSubmit}>probar description</button>*/}

          <div className="div-button-editar-estudiante">
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
