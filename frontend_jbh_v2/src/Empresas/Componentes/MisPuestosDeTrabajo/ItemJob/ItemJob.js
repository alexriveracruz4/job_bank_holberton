import React from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';

function ItemJob(props) {
  return (
      <li className='MPDTOneJobeEmpresa'>
        {
          props.deleted ? <b className="MPDTNoDisponible"> EMPLEO ELIMINADO </b> : <b className="MPDTDisponible"> DISPONIBLE </b>
        }
        <h2>{props.title}</h2>
        <p>Fecha de creación: FECHA DE CREACION</p>
        {
          props.deleted ? <p>Fecha de eliminacion: FECHA DE ELIMINACION</p> : ""
        }
        <div class="MPDTGroupOfButtons">
          <Link to={{ pathname:`/empresa/mis-puestos-de-trabajo/${props.JobId}` }} style={{color: 'inherit', textDecoration: 'inherit'}}>
          <button className="MPDTVerButton">
              Ver    
          </button>
          </Link>
          {
            props.deleted ? 
            "" : 
            <Link to={`/empresa/mis-puestos-de-trabajo/${props.JobId}/puesto-eliminado`} style={{color: 'inherit', textDecoration: 'inherit'}}>
              <button className="MPDTEliminarButton">
                Eliminar
              </button>
            </Link>
          }
          {
            props.deleted ? 
            "" : 
            <Link to={`/empresa/mis-puestos-de-trabajo/${props.JobId}/puesto-editado`} style={{color: 'inherit', textDecoration: 'inherit'}}>
              <button className="MPDTEditarButton">
                Editar
              </button>
            </Link>
          }
          <Link to={{ pathname:`/empresa/mis-puestos-de-trabajo/${props.JobId}/postulantes`, state: { titleJob: props.title } }} style={{color: 'inherit', textDecoration: 'inherit'}}>
              <button className="MPDTPostulantesButton">
              Ver postulantes
              </button>
          </Link>
        </div>
      </li>
  );
}

export { ItemJob };
