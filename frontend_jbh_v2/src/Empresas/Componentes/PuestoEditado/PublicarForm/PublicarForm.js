import React, { useState, useEffect } from 'react';
import Countries from "../../../data/country.json"
import "./PublicarForm.css"
import swal from 'sweetalert';
import { useHistory } from 'react-router';


const CrudForm = ({ updateData, dataToEdit}) => {
  const history = useHistory();
  const initailForm = {
    title: '',
    country: '',
    city:'',
    pres_or_remote: '',
    experience: '',
    travel_availability: '',
    age_min: '',
    age_max: '',
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
      }
    });
  }

  // Select with countries as options that are received from country.json
  function InputCountry() {
    return (
      <div className="form-group row">
        <label htmlFor="exampleFormControlSelect1" className="col-sm-1 col-form-label">País</label>
        <div className="col-sm-10">
          <select className="form-control" id="exampleFormControlSelect1" name="country" onChange={handleChange} value={form.country}>
            <option>{form.country}</option>
            {Countries.map(data => {;
              return <option value={data.country}>{data.country}</option>;
            })}
          </select>
        </div>
      </div>
    )
  }

  // Function that returns a select with job type options
  function JobType() {
    return (
      <div className="travel-row form-group row">
        <label htmlFor="inputJobType" className="travel-label col-sm-1 col-form-label">Jornada</label>
        <div className="select-travel-div col-sm-10">
          <select className="form-control" id="inputJobType" name="job_type" onChange={handleChange} value={form.job_type}>
            <option>{form.job_type}</option>
            <option value="Tiempo completo">Tiempo completo</option>
            <option value="Tiempo parcial">Tiempo parcial</option>
            <option value="Por horas">Por horas</option>
          </select>
        </div>
      </div>
    )
  }

  // Function that returns a select with work mode options
  function PresOrRemote() {
    return (
      <div className="travel-row form-group row">
        <label htmlFor="inputPresOrRemote" className="travel-label col-sm-1 col-form-label">Remoto o presencial</label>
        <div className="select-travel-div col-sm-10">
          <select className="form-control" id="inputPresOrRemote" name="pres_or_remote" onChange={handleChange} value={form.pres_or_remote}>
            <option>{form.pres_or_remote}</option>
            <option value="Presencial">Presencial</option>
            <option value="Remoto">Remoto</option>
            <option value="Semi-presencial">Semi-presencial</option>
          </select>
        </div>
      </div>
    )
  }

  // Function that returns a select with availability options
  function InputTravelAval() {
      return (
        <div className="travel-row form-group row">
          <label htmlFor="inputDisptravel" className="travel-label col-sm-1 col-form-label">Disponibilidad para viajar</label>
          <div className="select-travel-div col-sm-10">
            <select className="form-control" id="inputDiptravel" name="travel_availability" onChange={handleChange} value={form.travel_availability}>
              <option>{form.travel_availability}</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
    )
  }

  return (
    <div className="form-Publicar">
      <div className="profile-title">
        <h1>Editar puesto de trabajo</h1>
      </div>
      <div className="form-div">
        <form className="form-form">
          <div className="form-group row">
            <label htmlFor="inputTitle" className="col-sm-1 col-form-label">Título</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputTitle" name="title" onChange={handleChange} value={form.title}/>
            </div>
          </div>

          <InputCountry />

          <div className="form-group row">
            <label htmlFor="inputCity" className="col-sm-1 col-form-label">Ciudad</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputCity" name="city" onChange={handleChange} value={form.city}/>
            </div>
          </div>

          <PresOrRemote />

          <div className="form-group row">
            <label htmlFor="inputExp" className="col-sm-1 col-form-label">Experiencia</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputExp" name="experience" onChange={handleChange} value={form.experience}/>
            </div>
          </div>

          <div className="travel-div">
            <InputTravelAval />
          </div>

          <div className="form-group row">
            <label htmlFor="inputMinAge" className="col-sm-1 col-form-label">Edad mínima</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="inputMinAge" min="1" max="100" name="age_min" onChange={handleChange} value={form.age_min}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputMaxAge" className="col-sm-1 col-form-label">Edad máxima</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="inputMaxAge" min="1" max="100" name="age_max" onChange={handleChange} value={form.age_max}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputSalary" className="col-sm-1 col-form-label">Salario</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputSalary" name="salary" onChange={handleChange} value={form.salary} />
            </div>
          </div>

          <JobType />

          <div className="description-div">
            <div className="description-box form-group row">
              <label htmlFor="inputDescription" className="description-label col-sm-1 col-form-label">Descripción</label>
              <div className="text-div">
                <textarea className="form-control" id="inputDescription" rows="10" maxLength="1000" name="description" onChange={ handleChange } value={form.description} />
              </div>
            </div>
          </div>

          <div className="div-button-editar-estudiante">
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