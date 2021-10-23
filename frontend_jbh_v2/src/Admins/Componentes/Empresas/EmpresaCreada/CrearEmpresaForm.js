import React, { useState, useEffect } from "react";
import "./CrearEmpresaForm.css"
import Countries from "../data/country.json"

const initailForm = {
  name: "",
  description:"",
  email: "",
  nation: "",
  phonenumber: "",
  region: "",
  web: "",
  password: ""
};

const CrudForm = ({ createData }) => {
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
          <select className="form-control" id="exampleFormControlSelect1" onChange={ handleChange } name="nation" value={form.nation}>
            <option></option>
            {Countries.map(data => {;
              return <option value={data.country}>{data.country}</option>;
            })}
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


  /*mi codigo*/
  return (
    <div className="form-crear-empresa">
      <div className="profile-title">
        <h1>Agregar nuevo hiring partner</h1>
      </div>
      <div className="form-div">
        <form className="form-form" onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="inputTitle" className="col-sm-1 col-form-label">Empresa</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputTitle" name="name" onChange={handleChange} value={form.name}/>
            </div>
          </div>

          <InputCountry />

          <div className="form-group row">
            <label htmlFor="inputCity" className="col-sm-1 col-form-label">Ciudad</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputCity" name="region" onChange={handleChange} value={form.region}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputCity" className="col-sm-1 col-form-label">Celular</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputCity" name="phonenumber" onChange={handleChange} value={form.phonenumber}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputSalary" className="col-sm-1 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputSalary" name="email" onChange={handleChange} value={form.email} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputCity" className="col-sm-1 col-form-label">Contraseña</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputCity" name="password" onChange={handleChange} value={form.password}/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputSalary" className="col-sm-1 col-form-label">Web</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputSalary" name="web" onChange={handleChange} value={form.web} />
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
          <div className="div-button-create-partner">
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={handleSubmit}
              value="Enviar">Crear nuevo hiring partner
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  /*termina mi codigo */

  /*return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          value={form.name}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          onChange={handleChange}
          value={form.description}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="text"
          name="nation"
          placeholder="nation"
          onChange={handleChange}
          value={form.nation}
        />
        <input
          type="text"
          name="phonenumber"
          placeholder="phonenumber"
          onChange={handleChange}
          value={form.phonenumber}
        />
         <input
          type="text"
          name="region"
          placeholder="region"
          onChange={handleChange}
          value={form.region}
        />
        <input
          type="text"
          name="web"
          placeholder="web"
          onChange={handleChange}
          value={form.web}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={form.password}
        />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );*/
};

export default CrudForm;