import React, { useState, useEffect } from 'react';
import Countries from "../../../data/country.json"
import "./PublicarForm.css"
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import { useHistory } from 'react-router';
import apiPath from '../../../../ApiPath';

const cookies = new Cookies();
  
const CrudForm = ({ createData }) => {
  const history = useHistory();
  const PartnerId = cookies.get("id"); //string variable

  // Form with empty string and with the id of the partner who will create it
  const initailForm = {
    partner_id: parseInt(PartnerId),
    id: '',
    title: '',
    country: '',
    city:'',
    pres_or_remote: '',
    experience: '',
    age_min: '',
    age_max: '',
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
    } 
  });
}

  // Select with countries as options that are received from country.json
  function InputCountry() {
    return (
      <div className="form-group row">
        <label htmlFor="exampleFormControlSelect1" className="col-sm-1 col-form-label">País</label>
        <div className="col-sm-10">
          <select className="form-control" id="exampleFormControlSelect1" onChange={handleChange} name="country" value={form.country}>
            <option></option>
            {Countries.map(data => {;
              return <option value={data.country}>{data.country}</option>;
            })}
          </select>
        </div>
      </div>
    )
  }

  // Function that returns a select with Job type options
  function JobType() {
    return (
      <div className="travel-row form-group row">
        <label htmlFor="inputDisptravel" className="travel-label col-sm-1 col-form-label">Jornada</label>
        <div className="select-travel-div col-sm-10">
          <select className="form-control" id="inputDiptravel" onChange={handleChange} name="job_type" value={form.job_type}>
            <option></option>
            <option value="Tiempo completo">Tiempo completo</option>
            <option value="Tiempo parcial">Tiempo parcial</option>
            <option value="Por horas">Por horas</option>
          </select>
        </div>
      </div>
    )
  }

  // Function that returns a select with preference work mode options
  function PresOrRemote() {
    return (
      <div className="travel-row form-group row">
        <label htmlFor="inputPresOrRemote" className="travel-label col-sm-1 col-form-label">Remoto o presencial</label>
        <div className="select-travel-div col-sm-10">
          <select className="form-control" id="inputPresOrRemote" onChange={handleChange} name="pres_or_remote" value={form.pres_or_remote}>
            <option></option>
            <option value="Presencial">Presencial</option>
            <option value="Remoto">Remoto</option>
            <option value="Semi-presencial">Semi-presencial</option>
          </select>
        </div>
      </div>
    )
  }

  // Function that returns a select with Travel Availability options
  function InputTravelAval() {
      return (
        <div className="travel-row form-group row">
          <label htmlFor="inputDisptravel" className="travel-label col-sm-1 col-form-label">Disponibilidad para viajar</label>
          <div className="select-travel-div col-sm-10">
            <select className="form-control" id="inputDiptravel" onChange={handleChange} name="travel_availability" value={form.travel_availability}>
              <option></option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
    )
  }

  return (
    <div className="form-editar-partner">
      <div className="profile-title">
        <h1>Crear puesto de trabajo</h1>
      </div>
      <div className="form-div">
        <form className="form-form" onSubmit={handleSubmit}>

          <div className="form-group row">
            <label htmlFor="inputTitle" className="col-sm-1 col-form-label">Título</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputTitle" maxLength="40" name="title" onChange={handleChange} value={form.title}/>
            </div>
          </div>

          <InputCountry />

          <div className="form-group row">
            <label htmlFor="inputCity" className="col-sm-1 col-form-label">Ciudad</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputCity" maxLength="45" name="city" onChange={handleChange} value={form.city}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputExperience" className="col-sm-1 col-form-label">Experiencia</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputExperience" maxLength="45" name="experience" onChange={handleChange} value={form.experience}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputMinAge" className="col-sm-1 col-form-label">Edad mínima</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="inputMinAge" name="age_min" max="100" onChange={handleChange} value={form.age_min} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputMaxAge" className="col-sm-1 col-form-label">Edad máxima</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="inputMaxAge" name="age_max" max="100" onChange={handleChange} value={form.age_max}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputSalary" className="col-sm-1 col-form-label">Salario</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputSalary" name="salary" maxLength="45" onChange={handleChange} value={form.salary} />
            </div>
          </div>

          <JobType />

          <PresOrRemote />

          <InputTravelAval />

          <div className="description-div">
            <div className="description-box form-group row">
              <label htmlFor="inputDescription" className="description-label col-sm-1 col-form-label">Descripción</label>
              <div className="text-div">
                <textarea className="form-control" id="inputDescription" rows="10" maxLength="2000" name="description" onChange={ handleChange } value={form.description} />
              </div>
            </div>
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
}

export default CrudForm;