import React, { useState } from "react";
import './EstudianteNav.css';
import logo from "./ImagenesNav/holberton-logo.png";
import UserIcon from "./ImagenesNav/user-icon.png";
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import apiPath from "../../ApiPath";
import { useAuth0 } from "@auth0/auth0-react";


const cookies = new Cookies();

// Function that removes cookies from the current session
function closeSessionEst() {
    
    cookies.remove("id", {path: "/"});
    cookies.remove("firstname", {path: "/"});
    cookies.remove("lastname", {path: "/"});
    cookies.remove("email", {path: "/"});
    cookies.remove("github", {path: "/"});
    cookies.remove('pres_or_remot', {path:"/"});
    cookies.remove('availability', {path:"/"});
    cookies.remove('phonenumber', {path:"/"});
    cookies.remove('age', {path:"/"});
    cookies.remove('nationality', {path:"/"});
    cookies.remove('description', {path:"/"});
    cookies.remove('disp_travel', {path:"/"});
    cookies.remove('linkedin', {path:"/"});
    cookies.remove('twitter', {path:"/"});
    cookies.remove('token', {path:"/"});
    cookies.remove('created_at', {path:"/"});
    cookies.remove('updated_at', {path:"/"});
    cookies.remove('deleted_at', {path:"/"});
    cookies.remove('created_by', {path:"/"});
    cookies.remove('updated_by', {path:"/"});
    cookies.remove('deleted_by', {path:"/"});
    cookies.remove('deleted', {path:"/"});
    cookies.remove('cv_filename_physical', {path:"/"});
    cookies.remove('cv_filename_logical', {path:"/"});
    cookies.remove('photo_filename_physical', {path:"/"});
    cookies.remove('photo_filename_logical', {path:"/"});
    //window.location.href="/login/estudiante";
}

// Navigator component
function EstudianteNav() {

  const { logout } = useAuth0();
  const [student, setStudent] = useState([2]);

  React.useEffect(() => {
    obtenerDatosDeEstudiantes();
  }, []);

  let student_id = cookies.get('id')

  const obtenerDatosDeEstudiantes = async () => {
    const data = await fetch(`${apiPath}/students/${student_id}`);
    const applications = await data.json();
    setStudent(applications);
  }

  let history = useHistory();

  let photo = UserIcon;

  if (student.photo_filename_logical != null && student.photo_filename_logical != undefined){
    photo = `${apiPath}/student_photos/${student.photo_filename_logical}`;
  }

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
            <img src={ photo } className="usericon" alt="imagen de usuario" />
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

export { EstudianteNav };
