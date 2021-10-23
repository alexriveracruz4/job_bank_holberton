import React from "react";
import NavPuesto from "../../Componentes/PuestoStdView/Navegador/EstudianteNav";
import PuestoInfo from "../../Componentes/PuestoStdView/PuestoInfo/PuestoInfo";
import PartnerInfo from "../../Componentes/PuestoStdView/PartnerInfo/PartnerInfo";
import { useParams } from 'react-router-dom';
import Data from "../../data/puestodata.json";

const datos = Data;

function Puesto() {

  const { id_empresa, id } = useParams();
  console.log(id_empresa)
  console.log(id)

  const [JobData, setJobData] = React.useState([2]);

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/v1/partners/${id_empresa}/jobs/${id}`);
    const jobs = await data.json();
    setJobData(jobs);
  }

  return (
    <React.Fragment>
        <NavPuesto />
        <PartnerInfo 
          datos = {JobData}
        />
        <PuestoInfo 
          datos = {JobData}
        />
    </React.Fragment>
  );
}
export { Puesto };
