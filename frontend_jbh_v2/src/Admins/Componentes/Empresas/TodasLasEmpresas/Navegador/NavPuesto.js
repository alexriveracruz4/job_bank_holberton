import React from "react";
import './NavPuesto.css';
import logo from "./ImagenesNav/holberton-logo.png";
import UserIcon from "./ImagenesNav/user-icon.png";
import { useHistory } from 'react-router-dom'; 


function NavPuesto() {
  let history = useHistory();
  return (
    <header className="App-header">
      <div className="logo-container">
        <img src={ logo } className="logo" alt="logo holberton" />
      </div>
      <nav>
        <div className="nav-button">
          <div className="puestos-div">
            <button 
              className="puestos-button"
              onClick={ () => {history.push("/admin/empresas")}}>
              Empresas
            </button>
          </div>
          <div className="postulaciones-div">
            <button
              className="postulaciones-button" 
              onClick={ () => {history.push("/admin/estudiantes")}}>
              Estudiantes
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
            <button className="name-button">Admin 1</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavPuesto;