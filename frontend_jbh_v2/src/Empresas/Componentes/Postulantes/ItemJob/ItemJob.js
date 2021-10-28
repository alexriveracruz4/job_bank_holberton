import React from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';
import icoStudent from './user-icon.png';

function ItemJob(props) {

  const urldown = "http://localhost:5000/api/v1/downloadcv/" + props.cv_filename_logical
  return (
    <div className='ItemContainer'>
      <li className='POneJobeEmpresa'>
        <img className='PPhotoStudent' src={icoStudent} />
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
      <a href={urldown} download className='PCVButton'>
	<span className="spanItemJob">DESCARGAR CV</span>
      </a>
    </div>
  );
}

export { ItemJob };
