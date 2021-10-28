import React, { useState, useEffect } from "react";
import "./AdminEditado.css"
import Cookies from "universal-cookie";
import { useHistory } from "react-router";

const cookies = new Cookies();

const CrudForm = ({ updateData, dataToEdit}) => {

  const initailForm = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
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

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(form);
    cookies.set('firstname', form.firstname, {path:"/"});
    cookies.set('lastname', form.lastname, {path:"/"});
    let path = `/admin/estudiantes`; 
    history.push(path);
  };

  return (
    <div className="form-editar-admin">
      <div className="profile-title">
        <h1>Editar perfil</h1>
      </div>
      <div className="form-div">
        <form className="form-form" onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="inputFirstname" className="col-sm-1 col-form-label">Nombre</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputFirstname" name="firstname" onChange={handleChange} value={form.firstname}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputLastname" className="col-sm-1 col-form-label">Apellidos</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputLastname" name="lastname" onChange={handleChange} value={form.lastname}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-1 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail" name="email" onChange={handleChange} value={form.email} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputPassword" className="col-sm-1 col-form-label">Contraseña</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputPassword" name="password" onChange={handleChange} value={form.password}/>
            </div>
          </div>

          <div className="div-button-edit-admin">
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
};

export default CrudForm;