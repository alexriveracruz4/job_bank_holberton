import React from "react";
import './EmpresaNav.css';
import logo from "./ImagenesNav/holberton-logo.png";
import UserIcon from "./ImagenesNav/user-icon.png";
import { useHistory } from 'react-router-dom'; 
import Cookies from 'universal-cookie';


const cookies = new Cookies();

// Function that removes cookies from the current session
function closeSessionEst() {
    cookies.remove('id', {path: "/"});
    cookies.remove('name', {path: "/"});
    cookies.remove('email', {path: "/"});
    cookies.remove('nation', {path: "/"});
    cookies.remove('region', {path:"/"});
    cookies.remove('description', {path:"/"});
    cookies.remove('phonenumber', {path:"/"});
    cookies.remove('web', {path:"/"});
    cookies.remove('token', {path:"/"});
    cookies.remove('created_at', {path:"/"});
    cookies.remove('updated_at', {path:"/"});
    cookies.remove('deleted_at', {path:"/"});
    cookies.remove('created_by', {path:"/"});
    cookies.remove('updated_by', {path:"/"});
    cookies.remove('deleted_by', {path:"/"});
    cookies.remove('deleted', {path:"/"});
    cookies.remove('logo_filename_physical', {path:"/"});
    cookies.remove('logo_filename_logical', {path:"/"});
    window.location.href="/login/empresa";
}

function EmpresaNav() {
  let history = useHistory();
  return (
    <header className="Partner-nav">
      <div className="logo-container">
        <img src={ logo } className="logo" alt="logo holberton" />
      </div>
      <nav>
        <div className="nav-button">
          <div className="puestos-div">
            <button 
              className="puestos-button" 
              onClick={ () => {history.push("/empresa/mis-puestos-de-trabajo")}}>
              Mis puestos de trabajo
            </button>
          </div>
          <div className="postulaciones-div">
            <button 
              className="postulaciones-button" 
              onClick={ () => {history.push("/empresa/nuevo-puesto-de-trabajo")}}>
              Agregar puesto de trabajo
            </button>
          </div>
        </div>
      </nav>
      <div className="userprofilecontainer">
        <div className="userprofile">
          <div 
            className="profile-button" 
            Puestos de Trabajo
            onClick={ () => {history.push("/empresa/perfil")}}>
            <img src={ UserIcon } className="usericon" alt="imagen de usuario" />
            <button className="name-button">{cookies.get('name')}</button>
          </div>
        </div>
      </div>
      <div className="cerrarsesion">
        <button
          className="cerrarsesion-button"
          onClick={closeSessionEst}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export { EmpresaNav };
