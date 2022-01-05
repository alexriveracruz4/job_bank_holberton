import React from "react";
import "./PuestoInfo.css";

// This is the information section of the job, when a student clicks on a job
function PuestoInfo(props) {
  const datos = props.JobData[0];
  
  return (
    <div className="student-info-container">
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
          {datos.experience !== null ? <p><b>Experiencia mínima:</b> {datos.experience}</p>:""}
          {datos.travel_availability !== null ? <p><b>Disponibilidad de viajar:</b> {datos.travel_availability}</p>:""}
          {datos.country !== null ? <p><b>País:</b> {datos.country}</p>:""}
          {datos.city !== null ? <p><b>Ciudad:</b> {datos.city}</p>:""}
          {datos.pres_or_remote !== null ? <p><b>Modalidad:</b> {datos.pres_or_remote}</p>:""}
          {datos.salary !== null ? <p><b>Sueldo:</b> {datos.salary}</p>:""}
          {datos.job_type !== null ? <p><b>Tipo de trabajo:</b> {datos.job_type}</p>:""}
          {datos.age_min !== null || datos.age_max !== null ? <p><b>Rango de edad:</b> {datos.age_min} - {datos.age_max}</p>:""}
        </div>
      </div>
    </div>
  );
}

export default PuestoInfo;