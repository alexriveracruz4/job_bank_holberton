import React from "react";
import './EstudianteNav.css';
import logo from "./ImagenesNav/holberton-logo.png";
import UserIcon from "./ImagenesNav/user-icon.png";
import { useHistory } from 'react-router-dom'; 


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
            <button className="name-button">Bill Gates</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavPuesto;
