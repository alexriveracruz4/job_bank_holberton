import React, { useState, useEffect } from "react";
import "./CrearEstudianteForm.css";
import Countries from "../data/country.json";
import Cookies from "universal-cookie";
import swal from 'sweetalert';
import { useHistory } from "react-router";


const cookies = new Cookies();

const CrudForm = ({ createData }) => {

  // Declaring variables to use useHistory and admin cookies
  const history = useHistory();
  const AdminID = cookies.get("id");

  // Form with empty string and with the id of the admin who will create it
  const initailForm = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: "",
    nationality: "",
    availability: "",
    pres_or_remot: "",
    created_by: parseInt(AdminID),
    updated_by: parseInt(AdminID),
  };

  // Adding state to fill the form
  const [form, setForm] = useState(initailForm);

  // This event fills the form every time a key is pressed
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Sweetalert to confirm when the user clicks in Crear nuevo estudiante
  const handleSubmit = (e) => {
    e.preventDefault();
    swal({
      title: "CREAR ESTUDIANTE",
      text: `¿Está seguro de crear el nuevo estudiante?`,
      buttons: ["Cancelar", "Si"],
    }).then((willCreate) => {
      if (willCreate) {
        createData(form);
        swal("HAS CREADO EXITOSAMENTE UN NUEVO ESTUDIANTE", {
            timer:"1500"
        });
        setTimeout(() => {
          let path = `/admin/estudiantes`; 
          history.push(path);
        }, 1000);
      }
    });
  }

  // Function that returns a select with availability options
  function Availability() {
    return (
      <div className="travel-row form-group row">
        <label
          htmlFor="inputDisptravel"
          className="travel-label col-sm-1 col-form-label"
        >
          Estado actual
        </label>
        <div className="select-travel-div col-sm-10">
          <select
            className="form-control"
            id="inputDiptravel"
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

  // Function that returns a select with preference work mode options
  function PresOrRemote() {
    return (
      <div className="travel-row form-group row">
        <label
          htmlFor="inputDisptravel"
          className="travel-label col-sm-1 col-form-label"
        >
          Modo de trabajo de preferencia
        </label>
        <div className="select-travel-div col-sm-10">
          <select
            className="form-control"
            id="inputDiptravel"
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

  // Function that returns a select with names of countries from country.json as options
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
            <option></option>
            {Countries.map((data) => {
              return <option value={data.country}>{data.country}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="form-crear-estudiante">
      <div className="profile-title">
        <h1>Agregar estudiante</h1>
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

          <div className="div-button-create-partner">
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={handleSubmit}
              value="Enviar"
            >
              Crear nuevo estudiante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrudForm;
