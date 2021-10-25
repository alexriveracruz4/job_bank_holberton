import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Countries from "../../../data/country.json"
import UserIcon from "../Navegador/ImagenesNav/user-icon.png"
import "./Form.css"

const initailForm = {
  firstname: "",
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

const CrudForm = ({ updateData, dataToEdit}) => {
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

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(form);
    let path = `/estudiante/puestos-de-trabajo`; 
    history.push(path);
  };

  function InputCountry() {
    return (
      <div className="form-group row">
        <label htmlFor="exampleFormControlSelect1" className="col-sm-1 col-form-label">País</label>
        <div className="col-sm-10">
          <select className="form-control" id="exampleFormControlSelect1" onChange={handleChange} name="nationality" value={form.nationality}>
            <option>{form.nationality}</option>
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
        <label htmlFor="inputAvailability" className="travel-label col-sm-1 col-form-label">Estado actual</label>
        <div className="select-travel-div col-sm-10">
          <select className="form-control" id="inputAvailability" onChange={handleChange} name="availability" value={form.availability}>
            <option>{form.availability}</option>
            <option onClick={e => e.target.textarea}>Disponible a nuevas ofertas de trabajo</option>
            <option onClick={e => e.target.textarea}>No tengo empleo</option>
            <option onClick={e => e.target.textarea}>Estoy trabajando actualmente</option>
            <option onClick={e => e.target.textarea}>No tengo ningún interés en un nuevo empleo</option>
          </select>
        </div>
      </div>
    )
  }

  function PresOrRemote() {
    return (
      <div className="travel-row form-group row">
        <label htmlFor="inputPresOrRemote" className="travel-label col-sm-1 col-form-label">Modo de trabajo de preferencia</label>
        <div className="select-travel-div col-sm-10">
          <select className="form-control" id="inputPresOrRemote" onChange={handleChange} name="pres_or_remot" value={form.pres_or_remot}>
            <option>{form.pres_or_remot}</option>
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
            <select className="form-control" id="inputDiptravel" onChange={handleChange} name="disp_travel" value={form.disp_travel}>
              <option>{form.disp_travel}</option>
              <option value="Disponible">Disponible</option>
              <option value="No disponible">No disponible</option>
            </select>
          </div>
        </div>
    )
  }

  /*function CountChar() {
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
  }*/

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
                <small id="photoHelpInline" className="text-muted">Please upload a square-shaped picture. Max 2MB, Formats allowed: jpg, png.</small>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputFirstname" className="col-sm-1 col-form-label">Nombre</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputFirstname" name="firstname" onChange={handleChange} value={form.firstname} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputLastname" className="col-sm-1 col-form-label">Apellidos</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputLastname" name="lastname" onChange={handleChange} value={form.lastname} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-1 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail" name="email" onChange={handleChange} value={form.email}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputCellphone" className="col-sm-1 col-form-label">Celular</label>
            <div className="col-sm-10">
              <input type="tel" className="form-control" id="inputCellphone" name="phonenumber" onChange={handleChange} value={form.phonenumber} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputAge" className="col-sm-1 col-form-label">Edad</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="inputAge" min="1" max="100" name="age" onChange={handleChange} value={form.age} />
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
              <input type="text" className="form-control" id="inputLinkedIn" name="linkedin" onChange={handleChange} value={form.linkedin} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputGithub" className="col-sm-1 col-form-label">Github</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputGithub" name="github" onChange={handleChange} value={form.github} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputTwitter" className="col-sm-1 col-form-label">Twitter</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputTwitter" name="twitter" onChange={handleChange} value={form.twitter} />
            </div>
          </div>

          <div className="description-div">
            <div className="description-box form-group row">
              <label htmlFor="inputDescription" className="description-label col-sm-1 col-form-label">Descripción</label>
              <div className="text-div">
                <textarea className="form-control" id="inputDescription" rows="10" maxLength="1000" name="description" onChange={ handleChange } value={form.description} />
              </div>
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