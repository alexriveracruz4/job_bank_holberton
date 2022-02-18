import React, { useEffect, useState } from "react";
import { EmpresaNav } from '../../Navegador/EmpresaNav';
import { PuestoInfo } from "../../Componentes/PuestoEmpresaView/PuestoInfo/PuestoInfo";
import { PartnerInfo } from "../../Componentes/PuestoEmpresaView/PartnerInfo/PartnerInfo";
import { useParams } from "react-router";
import Cookies from 'universal-cookie';
import apiPath from "../../../ApiPath";
import { BackButton } from "../../../helpers/BackButton";
import { helpHttp } from "../../../helpers/helpHttp";
import Loader from "../../../helpers/Loader";
import Message from "../../../helpers/Message";
import { JobDescription } from "../../Componentes/PuestoEmpresaView/JobDescription.js";



const cookies = new Cookies();
function PuestoEmpresaView() {

  // Obtains the data of a job and stores it in AllAJobData
  const partner_id= cookies.get("partner_id"); //string variable


  const { JobId } = useParams();
  const [JobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let api = helpHttp();
  useEffect(() => {
    const obtenerJobDatos = async () => {
      window.scrollTo(0, 0);
      const url = `${apiPath}/partners/${partner_id}/jobs/${JobId}`;
      setLoading(true);
      api.get(url).then((res) => {
        if (!res.err) {
          setJobData(res);
          setError(null)
        } else {
          setJobData(null);
          setError(res);
        }
        setLoading(false);
      })
    };
    obtenerJobDatos();
  }, []);

  /*
  const obtenerDatos = async () => {
    const data = await fetch(`${apiPath}/partners/${partner_id}/jobs/${JobId}`);
    const jobs = await data.json();
    setAllAJobDta(jobs);
  }
  */
  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('partner_id')){
          window.location.href="/login/empresa";
      }
  });
  console.log(JobData);
  return (
    <React.Fragment>
      <EmpresaNav />
      {JobData &&
        <JobDescription
          datos={JobData}
        />
      }
    </React.Fragment>
  );
}

/*
<BackButton/>
      {loading && <Loader/>}
        {error && <Message/>}
        {JobData &&
      <PartnerInfo 
        datos = {JobData}
      />
        }
        {JobData &&
      <PuestoInfo 
        datos = {JobData}
      />
        }
*/
export { PuestoEmpresaView };
