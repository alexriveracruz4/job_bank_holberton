import React from 'react';
import './ItemJob.css';
import icoStudent from './user-icon.png';
import apiPath from '../../../../ApiPath';
import swal from 'sweetalert';

function ItemJob(props) {
  // Card with information of each applicant
  const urldown = `${apiPath}/downloadcv/` + props.cv_filename_logical


  const Downloadcv = (cv_filename_logical, nombre, apellido) => {
    if (cv_filename_logical === null) {
      swal({
        title: "Lástima",
        text: `El usuario ${nombre} ${apellido} no ha cargado su CV, intente en otro momento.`,
        icon: "error",
        timer:"4000"
      });      
    } else {
      window.open(urldown);
    }
  }
  let photo = icoStudent;

  if (props.photo_filename_logical != null || props.photo_filename_logical != undefined){
    photo = `${apiPath}/student_photos/${props.photo_filename_logical}`;
  }

  return (
    <div className='ItemContainer'>
      <li className='POneJobeEmpresa'>
        <img className='PPhotoStudent' src={photo} />
        {props.firstname !== null ? <p><b>Nombre:</b> {props.firstname} {props.lastname}</p>:""}
        {props.age !==null ? <p><b>Edad:</b> {props.age}</p>:""}
        {props.phonenumber !==null ? <p><b>Celular:</b> {props.phonenumber}</p>:""}
        {props.email !==null ? <p><b>Email:</b> {props.email}</p>:""}
        {props.availability !==null ? <p><b>Condición:</b> {props.availability}</p>:""}
        {props.disp_travel !==null ? <p><b>Disponiblidad de viajar:</b> {props.disp_travel}</p>:""}
        {props.nationality !==null ? <p><b>Nacionalidad:</b> {props.nationality}</p>:""}
        {props.pres_or_remot !==null ? <p><b>Presencial o remoto:</b> {props.pres_or_remot}</p>:""}
        {props.linkedin !==null ? <p><b>LinkedIn:</b> {props.linkedin}</p>:""}
        {props.github !==null ? <p><b>Github:</b> {props.github}</p>:""}
        {props.twitter !==null ? <p><b>Twitter:</b> {props.twitter}</p>:""}
        {props.description !==null ? <p><b>Descripción:</b> <br/> {props.description}</p>:""}
      </li>
      <button onClick={() => Downloadcv(props.cv_filename_logical, props.firstname, props.lastname)} className='PCVButton'>
	    <span className="spanItemJob">DESCARGAR CV</span>
      </button>
    </div>
  );
}

//<a href={urldown} download className='PCVButton'>
export { ItemJob };
