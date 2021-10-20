import React from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';

function ItemJob(props) {
  return (
      <li className='OneJobeEmpresa'>
        {
          props.deleted ? <b className="NoDisponible"> EMPLEO ELIMINADO </b> : <b className="Disponible"> DISPONIBLE </b>
        }
        <h2>{props.title}</h2>
        <p>Fecha de creación: FECHA DE CREACION</p>
        {
          props.deleted ? <p>Fecha de eliminacion: FECHA DE ELIMINACION</p> : ""
        }
        <div class="GroupOfButtons">
          <Link to={`/empresa/mis-puestos-de-trabajo/${props.id}`} style={{color: 'inherit', textDecoration: 'inherit'}}>
          <button className="VerButton">
              Ver    
          </button>
          </Link>
          {
            props.deleted ? 
            "" : 
            <Link to={`/empresa/mis-puestos-de-trabajo/${props.id}/puesto-eliminado`} style={{color: 'inherit', textDecoration: 'inherit'}}>
              <button className="EliminarButton">
                Eliminar
              </button>
            </Link>
          }
          {
            props.deleted ? 
            "" : 
            <Link to={`/empresa/mis-puestos-de-trabajo/${props.id}/puesto-editado`} style={{color: 'inherit', textDecoration: 'inherit'}}>
              <button className="EditarButton">
                Editar
              </button>
            </Link>
          }
          <Link to={`/empresa/mis-puestos-de-trabajo/${props.id}/postulantes`} style={{color: 'inherit', textDecoration: 'inherit'}}>
              <button className="PostulantesButton">
              Ver postulantes
              </button>
          </Link>
        </div>
      </li>
  );
}

export { ItemJob };
