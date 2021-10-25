import React from "react";
import './EstudianteNav.css';
import logo from "./ImagenesNav/holberton-logo.png";
import UserIcon from "./ImagenesNav/user-icon.png";
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

function closeSession() {
    cookies.remove("id", {path: "/"});
    cookies.remove("firstname", {path: "/"});
    cookies.remove("lastname", {path: "/"});
    cookies.remove("email", {path: "/"});
    cookies.remove("github", {path: "/"});
    cookies.remove("phonenumber", {path: "/"});
    window.location.href="/login/estudiante";
}

function NavPuesto() {
  let history = useHistory();
  return (
    <header className="Student-header">
      <div className="logo-container">
        <img src={ logo } className="logo" alt="logo holberton" />
      </div>
      <nav>
        <div className="nav-button">
          <div className="puestos-div">
            <button 
              className="puestos-button" 
              onClick={ () => {history.push("/estudiante/puestos-de-trabajo")}}>
              Puestos de Trabajo
            </button>
          </div>
          <div className="postulaciones-div">
            <button 
              className="postulaciones-button" 
              onClick={ () => {history.push("/estudiante/mis-postulaciones")}}>
              Mis Postulaciones
            </button>
          </div>
        </div>
      </nav>
      <div className="userprofilecontainer">
        <div className="userprofile">
          <div 
            className="profile-button" 
            Puestos de Trabajo
            onClick={ () => {history.push("/estudiante/perfil")}}>
            <img src={ UserIcon } className="usericon" alt="imagen de usuario" />
            <button className="name-button">{cookies.get('firstname')} {cookies.get('lastname')}</button>
          </div>
        </div>
      </div>
      <nav>
        <div className="cerrarsesion">
          <button
            className="cerrarsesion-button"
            onClick={closeSession}>
	    Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavPuesto;
