import React from "react";
import './EmpresaNav.css';
import logo from "./ImagenesNav/holberton-logo.png";
import UserIcon from "./ImagenesNav/user-icon.png";
import { useHistory } from 'react-router-dom'; 


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
            <button className="name-button">Bill Gates</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default EmpresaNav ;