import React, { useEffect, useState } from "react";

import { AdminNav } from "../../../Navegador/AdminNav";
import { PuestoInfo } from "../../../Componentes/TodosLosTrabajos/PuestoAdminView/PuestoInfo/PuestoInfo";
import { PartnerInfo } from "../../../Componentes/TodosLosTrabajos/PuestoAdminView/PartnerInfo/PartnerInfo";
import { useParams } from "react-router";
import Cookies from 'universal-cookie';
import apiPath from "../../../../ApiPath";


const cookies = new Cookies();
function PuestoAdminView() {

  // Gets the student data in JSON and saves it in AllAJobData
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

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('admin_id')){
          window.location.href="/login/admin";
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