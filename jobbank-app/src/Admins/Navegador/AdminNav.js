import React from "react";
import './AdminNav.css';
import logo from "./ImagenesNav/holberton-logo.png";
import UserIcon from "./ImagenesNav/user-icon.png";
import { useHistory } from 'react-router-dom'; 
import Cookies from 'universal-cookie';
import { useAuth0 } from "@auth0/auth0-react";


const cookies = new Cookies();

// Function that removes cookies from the current session
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

// Function that contains the navigation bar of the page
function AdminNav() {
  const { logout } = useAuth0();
  let history = useHistory();
  return (
    <header className="Admin-nav">
      <div className="logo-container">
        <img src={ logo } className="logo" alt="logo holberton" />
      </div>
      <nav>
        <div className="nav-button">
          <div className="admin-admins-div">
            <button 
              className="admin-admins-button" 
              onClick={ () => {history.push("/admin/admins")}}>
              Admins
            </button>
          </div>
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
            onClick={ () => {history.push("/admin/perfil")}}>
            <img src={ UserIcon } className="usericon" alt="imagen de usuario" />
            <button className="name-button">{cookies.get('firstname')} {cookies.get('lastname')}</button>
          </div>
        </div>
      </div>
      <div className="cerrarsesion">
        <button
          className="cerrarsesion-button"
          onClick={() => { closeSessionEst(); logout();}}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export { AdminNav };
