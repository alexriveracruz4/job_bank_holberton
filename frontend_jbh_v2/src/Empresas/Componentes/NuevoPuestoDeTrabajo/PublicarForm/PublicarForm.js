import React, { useState, useEffect } from 'react';
import Countries from "../../../data/country.json"
import "./PublicarForm.css"
import Cookies from 'universal-cookie';

const cookies = new Cookies();
  
const CrudForm = ({ createData }) => {

  const PartnerId = cookies.get("id"); //string variable

  const [AllMyJobs, setAllMyJobs] = useState([2]);


  useEffect(async() => {
    await obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/v1/partners/${PartnerId}/jobs/`);
    const jobs = await data.json();
    setAllMyJobs(jobs[jobs.length - 1].id + 1);
  }

  console.log(AllMyJobs)

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createData(form);
  };

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

  function PresOrRemote() {
    return (
      <div className="travel-row form-group row">
        <label htmlFor="inputDisptravel" className="travel-label col-sm-1 col-form-label">Remoto o presencial</label>
        <div className="select-travel-div col-sm-10">
          <select className="form-control" id="inputDiptravel">
            <option></option>
            <option value="Presencial">Presencial</option>
            <option value="Remoto">Remoto</option>
            <option value="Semi-presencial">Semi-presencial</option>
          </select>
        </div>
      </div>
    )
  }

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

  function CountChar() {
    const [count, setCount] = useState(0);
    return (
      <div className="text-div">
        <textarea
          className="form-control"
          id="inputDescription"
          rows="20"
          maxLength="1000"
          name="description"
          onChange={e => setCount(e.target.value.length)}>
        </textarea>
        <p>{ count } / 1000</p>
      </div>
    );
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
              <input type="text" className="form-control" id="inputTitle" name="title" onChange={handleChange} value={form.title}/>
            </div>
          </div>

          <InputCountry />

          <div className="form-group row">
            <label htmlFor="inputRegion" className="col-sm-1 col-form-label">Ciudad</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputRegion" name="region" onChange={handleChange} value={form.region}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputExperience" className="col-sm-1 col-form-label">Experiencia</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputExperience" name="experience" onChange={handleChange} value={form.experience}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputMinAge" className="col-sm-1 col-form-label">Edad mínima</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="inputMinAge" name="age_min" onChange={handleChange} value={form.age_min} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputMaxAge" className="col-sm-1 col-form-label">Edad máxima</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputMaxAge" name="age_max" onChange={handleChange} value={form.age_max}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputSalary" className="col-sm-1 col-form-label">Salario</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputSalary" name="salary" onChange={handleChange} value={form.salary} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputJobType" className="col-sm-1 col-form-label">Jornada</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputJobType" name="job_type" onChange={handleChange} value={form.job_type} />
            </div>
          </div>

          <JobType />

          <PresOrRemote />

          <InputTravelAval />

          <div className="description-div">
            <div className="description-box form-group row">
              <label htmlFor="inputDescription" className="description-label col-sm-1 col-form-label">Descripción</label>
              <div className="text-div">
                <textarea className="form-control" id="inputDescription" rows="10" maxLength="1000" name="description" onChange={ handleChange } value={form.description} />
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