import React, { useEffect } from "react";
import { EstudianteNav } from '../../Navegador/EstudianteNav'
import PuestoInfo from "../../Componentes/PuestoStdView/PuestoInfo/PuestoInfo";
import PartnerInfo from "../../Componentes/PuestoStdView/PartnerInfo/PartnerInfo";
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import apiPath from "../../../ApiPath";
import { BackButton } from "../../../helpers/BackButton";
import { useLocation } from "react-router-dom";


const cookies = new Cookies();
function Puesto() {
  // Get data to use in the component
  const { PartnerId, JobId } = useParams();
  const [JobData, setJobData] = React.useState([2]);

  let location = useLocation();
  let EstadoDePostulacion = location.state.EstadoDePostulacion
  let DatosEmpresa = location.state.DatosEmpresa


  React.useEffect(() => {
    obtenerJobDatos();
  }, []);

  const obtenerJobDatos = async () => {
    window.scrollTo(0, 0);
    const data = await fetch(`${apiPath}/partners/${PartnerId}/jobs/${JobId}`);
    const jobs = await data.json();
    setJobData(jobs);
  }

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/estudiante";
      }
  });

  return (
    <React.Fragment>
        <EstudianteNav />
        <BackButton/>
        <PartnerInfo 
          JobData = {JobData}
          PartnerName={DatosEmpresa.name}
          PartnerEmail={DatosEmpresa.email}
          EstadoDePostulacion={EstadoDePostulacion}
        />
        <PuestoInfo 
          JobData = {JobData}
        />
    </React.Fragment>
  );
}
export { Puesto };
