import React, { useEffect, useState } from "react";
import { NavPuesto } from "../../Componentes/PuestoEmpresaView/Navegador/EmpresaNav";
import { PuestoInfo } from "../../Componentes/PuestoEmpresaView/PuestoInfo/PuestoInfo";
import { PartnerInfo } from "../../Componentes/PuestoEmpresaView/PartnerInfo/PartnerInfo";

import Data from "../../data/MispuestosEmpresa.json";
import { useParams } from "react-router";

const datos = Data;

function PuestoEmpresaView() {
  
  const partner_id = 1;
  const { JobId } = useParams();
  console.log(JobId);
  const [AllAJobData, setAllAJobDta] = useState([2]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/v1/partners/${partner_id}/jobs/${JobId}`);
    const jobs = await data.json();
    setAllAJobDta(jobs);
  }
  console.log(AllAJobData)

  return (
    <React.Fragment>
      <NavPuesto />
      <PartnerInfo 
        datos = {AllAJobData}
      />
      <PuestoInfo 
        datos = {AllAJobData}
      />
    </React.Fragment>
  );
}

export { PuestoEmpresaView };
