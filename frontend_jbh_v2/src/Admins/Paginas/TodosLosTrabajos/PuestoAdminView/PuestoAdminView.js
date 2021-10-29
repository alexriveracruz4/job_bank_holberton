import React, { useEffect, useState } from "react";

import { AdminNav } from "../../../Navegador/AdminNav";
import { PuestoInfo } from "../../../Componentes/TodosLosTrabajos/PuestoAdminView/PuestoInfo/PuestoInfo";
import { PartnerInfo } from "../../../Componentes/TodosLosTrabajos/PuestoAdminView/PartnerInfo/PartnerInfo";
import { useParams } from "react-router";
import Cookies from 'universal-cookie';
import apiPath from "../../../../ApiPath";


const cookies = new Cookies();
function PuestoAdminView() {

  
  const { PartnerId, JobId } = useParams();
  const [AllAJobData, setAllAJobDta] = useState([2]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`${apiPath}/partners/${PartnerId}/jobs/${JobId}`);
    const jobs = await data.json();
    setAllAJobDta(jobs);
  }

  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/empresa";
      }
  });
  return (
    <React.Fragment>
      <AdminNav />
      <PartnerInfo 
        datos = {AllAJobData}
      />
      <PuestoInfo 
        datos = {AllAJobData}
      />
    </React.Fragment>
  );
}

export { PuestoAdminView };