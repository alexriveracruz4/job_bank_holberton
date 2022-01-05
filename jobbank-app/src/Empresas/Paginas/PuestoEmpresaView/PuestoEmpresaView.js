import React, { useEffect, useState } from "react";

import { EmpresaNav } from '../../Navegador/EmpresaNav';
import { PuestoInfo } from "../../Componentes/PuestoEmpresaView/PuestoInfo/PuestoInfo";
import { PartnerInfo } from "../../Componentes/PuestoEmpresaView/PartnerInfo/PartnerInfo";

import { useParams } from "react-router";
import Cookies from 'universal-cookie';

import apiPath from "../../../ApiPath";

const cookies = new Cookies();
function PuestoEmpresaView() {

  // Obtains the data of a job and stores it in AllAJobData
  const partner_id= cookies.get("id"); //string variable

  const { JobId } = useParams();
  const [AllAJobData, setAllAJobDta] = useState([2]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`${apiPath}/partners/${partner_id}/jobs/${JobId}`);
    const jobs = await data.json();
    setAllAJobDta(jobs);
  }

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/empresa";
      }
  });

  return (
    <React.Fragment>
      <EmpresaNav />
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
