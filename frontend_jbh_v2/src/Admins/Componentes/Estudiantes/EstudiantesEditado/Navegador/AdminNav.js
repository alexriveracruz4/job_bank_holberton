import React from "react";
import './AdminNav.css';
import logo from "./ImagenesNav/holberton-logo.png";
import UserIcon from "./ImagenesNav/user-icon.png";
import { useHistory } from 'react-router-dom'; 


function AdminNav() {
  let history = useHistory();
  return (
    <header className="Admin-nav">
      <div className="logo-container">
        <img src={ logo } className="logo" alt="logo holberton" />
      </div>
      <nav>
        <div className="nav-button">
          <div className="admin-estudiantes-div">
            <button 
              className="admin-estudiantes-button" 
              onClick={ () => {history.push("/estudiantes/crear-estudiante")}}>
              Estudiantes
            </button>
          </div>
          <div className="admin-partners-div">
            <button 
              className="admin-partners-button" 
              onClick={ () => {history.push("/empresa/nuevo-puesto-de-trabajo")}}>
              Partners
            </button>
          </div>
          <div className="admin-puestos-div">
            <button 
              className="admin-puestos-button" 
              onClick={ () => {history.push("/empresa/nuevo-puesto-de-trabajo")}}>
              Puestos de trabajo
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

export default AdminNav;