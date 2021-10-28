import React, { useState, useEffect } from "react";
import "./EmpresaEditada.css"
import Countries from "../data/country.json"
import swal from 'sweetalert';
import { useHistory } from "react-router";


const CrudForm = ({ updateData, dataToEdit}) => {
  const history = useHistory();

  const initailForm = {
    name: "",
    nation: "",
    region: "",
    phonenumber: "",
    email: "",
    password: "",
    web: "",
    description:""
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
/*
  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(form);
  };
*/
  const handleSubmit = (e) => {
    e.preventDefault();
    swal({
      title: "EDITAR EMPRESA",
      text: `¿Está seguro de guardar los nuevos cambios realizados en la empresa "${dataToEdit.name}"?`,
      buttons: ["Cancelar", "Guardar"],
    }).then((willEdit) => {
      if (willEdit) {
        updateData(form);
        swal("HAS EDITADO EXITOSAMENTE LOS DATOS DE LA EMPRESA", {
            timer:"1500"
        });
        setTimeout(() => {
          history.go(0);
        }, 1000);
      }
    });
  }



  function InputCountry() {
    return (
      <div className="form-group row">
        <label htmlFor="exampleFormControlSelect1" className="col-sm-1 col-form-label">País</label>
        <div className="col-sm-10">
          <select className="form-control" id="exampleFormControlSelect1" onChange={ handleChange } name="nation" value={form.nation}>
            <option>{form.nation}</option>
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
    <div className="form-editar-empresa">
      <div className="profile-title">
        <h1>Editar hiring partner</h1>
      </div>
      <div className="form-div">
        <form className="form-form" onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-1 col-form-label">Empresa</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputName" name="name" onChange={handleChange} value={form.name}/>
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
            <label htmlFor="inputPhonenumber" className="col-sm-1 col-form-label">Celular</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputPhonenumber" name="phonenumber" onChange={handleChange} value={form.phonenumber}/>
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

          <div className="form-group row">
            <label htmlFor="inputWeb" className="col-sm-1 col-form-label">Web</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputWeb" name="web" onChange={handleChange} value={form.web} />
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
              value="Enviar">Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default CrudForm;