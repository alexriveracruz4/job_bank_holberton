import React from "react";
import "./PuestoInfo.css";
import { useParams } from 'react-router-dom';

function PuestoInfo(props) {
  const { id } = useParams();
  const datos = props.datos.filter(i => i.id == id)[0];
  console.log(datos)
  function Travel_aval() {
    if (datos.travel_availability === 0) {
      return "no disponible"
    } else {
      return "disponible"
    }
  }


  function Contract_type() {
    if (datos.contract_type === 0) {
      return 'Contrato indeterminado.'
    } else if (datos.contract_type === 1){
      return 'Contrato sujeto a modalidad.'
    } else {
      return 'Contrato a tiempo parcial'
    }
  }

  function Pres_or_remote() {
    if (datos.pres_or_remote === 0) {
      return 'Presencial.'
    } else if (datos.pres_or_remote === 1){
      return 'Remoto'
    } else {
      return 'Presencial o remoto'
    }
  }

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
          <p>Disponibilidad de viajar: <Travel_aval /></p>
          <p>Tipo de contrato: <Contract_type /></p>
          <p>País: {datos.country}</p>
          <p>Ciudad: {datos.city}</p>
          <p>Modalidad: <Pres_or_remote /></p>
          <p>Sueldo: {datos.salary} $</p>
        </div>
      </div>
    </div>
  );
}


export { PuestoInfo };