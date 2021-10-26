import React from "react";
import './AdminNav.css';
import logo from "./ImagenesNav/holberton-logo.png";
import UserIcon from "./ImagenesNav/user-icon.png";
import { useHistory } from 'react-router-dom'; 
import Cookies from 'universal-cookie';


const cookies = new Cookies();

function closeSessionEst() {
    cookies.remove("id", {path: "/"});
    cookies.remove("firstname", {path: "/"});
    cookies.remove("lastname", {path: "/"});
    cookies.remove("email", {path: "/"});
    cookies.remove('token', {path:"/"});
    cookies.remove('created_at', {path:"/"});
    cookies.remove('updated_at', {path:"/"});
    cookies.remove('deleted_at', {path:"/"});
    window.location.href="/login/admin";
}


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
              onClick={ () => {history.push("/admin/estudiantes")}}>
              Estudiantes
            </button>
          </div>
          <div className="admin-partners-div">
            <button 
              className="admin-partners-button" 
              onClick={ () => {history.push("/admin/empresas")}}>
              Empresas
            </button>
          </div>
          <div className="admin-puestos-div">
            <button 
              className="admin-puestos-button" 
              onClick={ () => {history.push("/admin/todos-los-trabajos")}}>
              Todos los Puestos de trabajo
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
            <button className="name-button">{cookies.get('firstname')} {cookies.get('lastname')}</button>
          </div>
        </div>
      </div>
      <nav>
        <div className="cerrarsesion">
          <button
            className="cerrarsesion-button"
            onClick={closeSessionEst}>
            Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  );
}

export { AdminNav };
