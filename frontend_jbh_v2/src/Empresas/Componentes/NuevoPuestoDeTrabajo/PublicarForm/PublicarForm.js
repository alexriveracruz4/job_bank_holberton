import React, { useState } from 'react';
import axios from "axios";
import Countries from "../../../data/country.json"
import "./PublicarForm.css"

function PuestoForm() {

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({
    title: '',
    city:'',
    experience: '',
    age_min: '',
    age_max: '',
    salary: '',
  })

  function handleInputChange (event) {
    console.log(event.target.value)
    setData({
      ...data,
      [event.target.name] : event.target.value
    })
  }

  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);

    axios.put('http://localhost:5000/api/v1/jobs/5', data).then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      setIsError(true);
    });
  }

  function InputCountry() {
    return (
      <div className="form-group row">
        <label htmlFor="exampleFormControlSelect1" className="col-sm-1 col-form-label">País</label>
        <div className="col-sm-10">
          <select className="form-control" id="exampleFormControlSelect1">
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
          <select className="form-control" id="inputDiptravel">
            <option></option>
            <option value="tiempo-completo">Tiempo completo</option>
            <option value="tiempo-parcial">Tiempo parcial</option>
            <option value="por-horas">Por horas</option>
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
            <option value="presencial">Presencial</option>
            <option value="remoto">Remoto</option>
            <option value="semi-presencial">Semi-presencial</option>
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
            <select className="form-control" id="inputDiptravel">
              <option></option>
              <option value="si">Si</option>
              <option value="no">No</option>
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
    <div className="form-Publicar">
      <div className="profile-title">
        <h1>Agregar nuevo puesto de trabajo</h1>
      </div>
      <div className="form-div">
        <form className="form-form">
          <div className="form-group row">
            <label htmlFor="inputTitle" className="col-sm-1 col-form-label">Título</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputTitle" name="title" onChange={handleInputChange} />
            </div>
          </div>

          <InputCountry />

          <div className="form-group row">
            <label htmlFor="inputCity" className="col-sm-1 col-form-label">Ciudad</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputCity" name="city" onChange={handleInputChange} />
            </div>
          </div>

          <PresOrRemote />

          <div className="form-group row">
            <label htmlFor="inputExp" className="col-sm-1 col-form-label">Experiencia</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputExp" name="experience" onChange={handleInputChange} />
            </div>
          </div>

          <div className="travel-div">
            <InputTravelAval />
          </div>

          <div className="form-group row">
            <label htmlFor="inputMinAge" className="col-sm-1 col-form-label">Edad mínima</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="inputMinAge" min="1" max="100" name="age_min" onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputMaxAge" className="col-sm-1 col-form-label">Edad máxima</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="inputMaxAge" min="1" max="100" name="age_max" onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputSalary" className="col-sm-1 col-form-label">Salario</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputSalary" name="salary" onChange={handleInputChange} />
            </div>
          </div>

          <JobType />

          <div className="description-div">
            <div className="description-box form-group row">
              <label htmlFor="inputDescription" className="description-label col-sm-1 col-form-label">Descripción</label>
              <CountChar />
            </div>
          </div>

          <div className="update form-group row">
            <div className="col-sm-10">
              {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>}
              <button
                type="submit"
                className="btn btn-primary mt-3"
                onClick={handleSubmit}
                disabled={loading}
              >{loading ? 'Loading...' : 'Update'}</button>
              {data && <div className="mt-3">
                <strong>Output:</strong><br />
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
              }
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default PuestoForm;