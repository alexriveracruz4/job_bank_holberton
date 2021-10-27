import React, { useState, useEffect } from "react";
import "./EditarEstudianteForm.css";
import Countries from "../data/country.json";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const CrudForm = ({ updateData, dataToEdit }) => {
  const AdminID = cookies.get("id");

  const initailForm = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: "",
    age: "",
    nationality: "",
    availability: "",
    pres_or_remot: "",
    description: "",
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(form);
  };

  function Availability() {
    return (
      <div className="travel-row form-group row">
        <label
          htmlFor="inputAvailability"
          className="travel-label col-sm-1 col-form-label"
        >
          Estado actual
        </label>
        <div className="select-travel-div col-sm-10">
          <select
            className="form-control"
            id="inputAvailability"
            onChange={handleChange}
            name="availability"
            value={form.availability}
          >
            <option>{form.availability}</option>
            <option onClick={(e) => e.target.textarea}>
              Disponible a nuevas ofertas de trabajo
            </option>
            <option onClick={(e) => e.target.textarea}>No tengo empleo</option>
            <option onClick={(e) => e.target.textarea}>
              Estoy trabajando actualmente
            </option>
            <option onClick={(e) => e.target.textarea}>
              No tengo ningún interés en un nuevo empleo
            </option>
          </select>
        </div>
      </div>
    );
  }

  function PresOrRemote() {
    return (
      <div className="travel-row form-group row">
        <label
          htmlFor="inputPresOrRemote"
          className="travel-label col-sm-1 col-form-label"
        >
          Modo de trabajo de preferencia
        </label>
        <div className="select-travel-div col-sm-10">
          <select
            className="form-control"
            id="inputPresOrRemote"
            onChange={handleChange}
            name="pres_or_remot"
            value={form.pres_or_remot}
          >
            <option>{form.pres_or_remot}</option>
            <option value="Presencial">Presencial</option>
            <option value="Remoto">Remoto</option>
            <option value="Semi-presencial">Semi-presencial</option>
          </select>
        </div>
      </div>
    );
  }

  function InputCountry() {
    return (
      <div className="form-group row">
        <label
          htmlFor="exampleFormControlSelect1"
          className="col-sm-1 col-form-label"
        >
          País
        </label>
        <div className="col-sm-10">
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={handleChange}
            name="nationality"
            value={form.nationality}
          >
            <option>{form.nationality}</option>
            {Countries.map((data) => {
              return <option value={data.country}>{data.country}</option>;
            })}
          </select>
        </div>
      </div>
    );
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
    <div className="form-editar-estudiante">
      <div className="profile-title">
        <h1>Editar estudiante</h1>
      </div>
      <div className="form-div">
        <form className="form-form" onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="inputFirstname" className="col-sm-1 col-form-label">
              Nombre
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputFirstname"
                name="firstname"
                onChange={handleChange}
                value={form.firstname}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputLastname" className="col-sm-1 col-form-label">
              Apellidos
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputLastname"
                name="lastname"
                onChange={handleChange}
                value={form.lastname}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-1 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                onChange={handleChange}
                value={form.email}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-1 col-form-label">
              Contraseña
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                onChange={handleChange}
                value={form.password}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="inputPhonenumber"
              className="col-sm-1 col-form-label"
            >
              Celular
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputPhonenumber"
                name="phonenumber"
                onChange={handleChange}
                value={form.phonenumber}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputAge" className="col-sm-1 col-form-label">
              Edad
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="inputAge"
                min="1"
                max="100"
                name="age"
                onChange={handleChange}
                value={form.age}
              />
            </div>
          </div>

          <InputCountry />

          <Availability />

          <PresOrRemote />

          <div className="description-div">
            <div className="description-box form-group row">
              <label
                htmlFor="inputDescription"
                className="description-label col-sm-1 col-form-label"
              >
                Descripción
              </label>
              <div className="text-div">
                <textarea
                  className="form-control"
                  id="inputDescription"
                  rows="10"
                  maxLength="1000"
                  name="description"
                  onChange={handleChange}
                  value={form.description}
                />
              </div>
            </div>
          </div>

          <div className="div-button-create-partner">
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={handleSubmit}
              value="Enviar"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrudForm;
