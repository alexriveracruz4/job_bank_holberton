import React from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';

function ItemJob(props) {

  return (
    <Link to={`/estudiante/puestos-de-trabajo/partners/${props.id_empresa}/jobs/${props.id_job}`} style={{ color: 'inherit', textDecoration: 'inherit'}}> 
      <li className='OneJob'>
        <h2>{props.title}</h2>
        <h3>{props.city}</h3>
        <p>{props.description.slice(0, 250) + "..."}</p>
        <p>Experiencia: {props.experience}</p>
      </li>
    </Link>
  );
}

export { ItemJob }
