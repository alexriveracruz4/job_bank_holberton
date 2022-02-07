import React, { useState } from "react";
import './EmpresaNav.css';
import logo from "./ImagenesNav/holberton-logo.png";
import UserIcon from "./ImagenesNav/user-icon.png";
import { useHistory } from 'react-router-dom'; 
import Cookies from 'universal-cookie';
import apiPath from "../../ApiPath";
import { useAuth0 } from "@auth0/auth0-react";


const cookies = new Cookies();

// Function that removes cookies from the current session
function closeSessionEst() {
    cookies.remove('partner_id', {path: "/"});
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
    window.location.href="/home";
}

function EmpresaNav() {
  const { logout } = useAuth0();
  const [partner, setPartner] = useState([2]);

  React.useEffect(() => {
    obtenerDatosDePartners();
  }, []);

  let partner_id = cookies.get('partner_id')

  const obtenerDatosDePartners = async () => {
    const data = await fetch(`${apiPath}/partners/${partner_id}`);
    const applications = await data.json();
    setPartner(applications);
  }

  let history = useHistory();

  let photo = UserIcon;

  if (partner.logo_filename_logical != null && partner.logo_filename_logical != undefined){
    photo = `${apiPath}/partner_photos/${partner.logo_filename_logical}`;
  }

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
            <img src={ photo } className="usericon" alt="imagen de usuario" />
            <button className="name-button">{cookies.get('name')}</button>
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

export { EmpresaNav };
