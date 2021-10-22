import React from "react";
import "./PuestoInfo.css";
import { useParams } from 'react-router-dom';


function PuestoInfo(props) {
  //const { id } = useParams();
  const datos = props.datos[0];
  
  return (
    <div className="info-container">
      <div className="description-container">
        <div className="description-title">
          <p>Descripción</p>
        </div>
        <div className="description-content">
              <p>{datos.description}</p>
        </div>
      </div>
      <div className="requirements-container">
        <div className="requirements-title">
          <p>Requerimientos y especificaciones</p>
        </div>
        <div className="requirements-content">
          <p>Experiencia: {datos.experience}</p>
          <p>Disponibilidad de viajar: {datos.travel_availability}</p>
          <p>Tipo de contrato: {datos.contract_type}</p>
          <p>País: {datos.country}</p>
          <p>Ciudad: {datos.city}</p>
          <p>Modalidad: {datos.pres_or_remote}</p>
          <p>Sueldo: {datos.salary}</p>
        </div>
      </div>
    </div>
  );
}

export default PuestoInfo;