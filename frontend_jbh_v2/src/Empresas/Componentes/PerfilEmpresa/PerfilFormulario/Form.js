import React, { useState } from 'react';
import axios from "axios";
import Countries from "../../../data/country.json"
import UserIcon from "../Navegador/ImagenesNav/user-icon.png"
import "./Form.css"

function EmpresaForm() {

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    web: ''
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

    axios.put('http://localhost:5000/api/v1/partners/5', data).then(res => {
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
    <div className="form-Partner">
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
            <label htmlFor="inputFname" className="col-sm-1 col-form-label">Empresa</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputName" name="name" onChange={handleInputChange} />
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
            <label htmlFor="inputEmail" className="col-sm-1 col-form-label">Web</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputWeb" name="web" onChange={handleInputChange} />
            </div>
          </div>

          <InputCountry />

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

export default EmpresaForm;