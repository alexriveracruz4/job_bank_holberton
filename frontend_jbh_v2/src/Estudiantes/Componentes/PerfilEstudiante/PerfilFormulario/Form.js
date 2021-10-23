import React, { useState } from 'react';
import axios from "axios";
import Countries from "../../../data/country.json"
import UserIcon from "../Navegador/ImagenesNav/user-icon.png"
import "./Form.css"

function EstudianteForm() {

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    age: '',
    linkedin: '',
    github: '',
    twitter: ''
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

    axios.put('http://localhost:5000/api/v1/students/5', data).then(res => {
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

  function Availability() {
    return (
      <div className="travel-row form-group row">
        <label htmlFor="inputDisptravel" className="travel-label col-sm-1 col-form-label">Estado actual</label>
        <div className="select-travel-div col-sm-10">
          <select className="form-control" id="inputDiptravel">
            <option value="disponible">Disponible a nuevas ofertas de trabajo</option>
            <option value="sin-empleo">No tengo empleo</option>
            <option value="trabajando">Estoy trabajando actualmente</option>
            <option value="no-busco-empleo">No tengo ningún interés en un nuevo empleo</option>
          </select>
        </div>
      </div>
    )
  }

  function PresOrRemote() {
    return (
      <div className="travel-row form-group row">
        <label htmlFor="inputDisptravel" className="travel-label col-sm-1 col-form-label">Modo de trabajo de preferencia</label>
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
              <option value="disponible">Disponible</option>
              <option value="no-disponible">No disponible</option>
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
          rows="10"
          maxLength="1000"
          name="description"
          onChange={e => setCount(e.target.value.length)}>
        </textarea>
        <p>{ count } / 1000</p>
      </div>
    );
  }

  return (
    <div className="form-Estudiante">
      <div className="profile-title">
        <h1>My profile</h1>
        <h2>Edit your profile</h2>
      </div>
      <div className="form-div">
        <div className="div-user-icon">
          <div className="div-center-icon col-sm-10">
            <img src={ UserIcon } className="usericon-form" alt="imagen de usuario" />
          </div>
        </div>
        <form className="form-form">
          <div className="form-group row">
            <label htmlFor="inputPhoto" className="col-sm-1 col-form-label">Foto de perfil</label>
            <div className="col-sm-10">
              <div className="box-photo form-control">
                <input type="file" id="myphoto" />
              </div>
              <div className="div-photohelp">
                <small id="photoHelpInline" class="text-muted">Please upload a square-shaped picture. Max 2MB, Formats allowed: jpg, png.</small>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputFname" className="col-sm-1 col-form-label">Nombre</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputFname" name="firstname" onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputLname" className="col-sm-1 col-form-label">Apellidos</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputLname" name="lastname" onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-1 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail" name="email" onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputCellphone" className="col-sm-1 col-form-label">Celular</label>
            <div className="col-sm-10">
              <input type="tel" className="form-control" id="inputCellphone" name="phonenumber" onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputAge" className="col-sm-1 col-form-label">Edad</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="inputAge" min="1" max="100" name="age" onChange={handleInputChange} />
            </div>
          </div>

          <Availability />

          <PresOrRemote />

          <InputCountry />

          <div className="travel-div">
            <InputTravelAval />
          </div>

          <div className="form-group row">
            <label htmlFor="inputLinkedIn" className="col-sm-1 col-form-label">LinkedIn</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputLinkedIn" name="linkedin" onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputGithub" className="col-sm-1 col-form-label">Github</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputGithub" name="github" onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputGithub" className="col-sm-1 col-form-label">Twitter</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputGithub" name="twitter" onChange={handleInputChange} />
            </div>
          </div>

          <div className="description-div">
            <div className="description-box form-group row">
              <label htmlFor="inputDescription" className="description-label col-sm-1 col-form-label">Descripción</label>
              <CountChar />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputPhoto" className="col-sm-1 col-form-label">Subir CV</label>
            <div className="col-sm-10">
              <div className="box-photo form-control">
                <input type="file" id="myphoto" />
              </div>
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

export default EstudianteForm;