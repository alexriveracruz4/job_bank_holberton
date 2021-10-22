import React from 'react';
import './ItemJob.css';

function ItemJob(props) {
  return (
    <li className='OneJob'>
      <h2>{props.titulo}</h2>
      <h3>{props.ciudad}</h3>
      <p>{props.descripcion}</p>
      <p>Años de experiencia: {props.añosDeExperiencia}</p>
    </li>
  );
}

export { ItemJob }
