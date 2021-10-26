import React, { useEffect } from "react";
import { EstudianteNav } from '../../Navegador/EstudianteNav'
import PuestoInfo from "../../Componentes/PuestoStdView/PuestoInfo/PuestoInfo";
import PartnerInfo from "../../Componentes/PuestoStdView/PartnerInfo/PartnerInfo";
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useLocation } from 'react-router-dom';

const cookies = new Cookies();
function Puesto() {

  const studentId = cookies.get("id");
  const { PartnerId, JobId } = useParams();

  const [JobData, setJobData] = React.useState([2]);
  const [PostulantesData, setPostulantesData] = React.useState([2]);
  const [PartnerData, setPartnerData] = React.useState([2]);

  React.useEffect(() => {
    obtenerJobDatos();
    obtenerPostulantesDatos();
    obtenerParnertDatos();
  }, []);

  const obtenerJobDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/v1/partners/${PartnerId}/jobs/${JobId}`);
    const jobs = await data.json();
    setJobData(jobs);
  }

  const obtenerPostulantesDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/v1/jobs/${PartnerId}/${JobId}/students`);
    const postulantes = await data.json();
    setPostulantesData(postulantes);
  }

  const obtenerParnertDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/v1/partners/${PartnerId}`);
    const parnert = await data.json();
    setPartnerData(parnert);
  }


  let PostulantesIDs = PostulantesData.map(postulante => postulante.id);
  console.log(PostulantesIDs);

  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/estudiante";
      }
  });

  return (
    <React.Fragment>
        <EstudianteNav />
        <PartnerInfo 
          JobData = {JobData}
          PostulantesIDs={PostulantesIDs}
          PartnerName={PartnerData.name}
        />
        <PuestoInfo 
          JobData = {JobData}
        />
    </React.Fragment>
  );
}
export { Puesto };
