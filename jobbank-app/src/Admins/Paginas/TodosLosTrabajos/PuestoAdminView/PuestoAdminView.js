import React, { useEffect, useState } from "react";
import { AdminNav } from "../../../Navegador/AdminNav";
import { useParams } from "react-router";
import Cookies from 'universal-cookie';
import apiPath from "../../../../ApiPath";
import { JobDescriptionAdminView } from "../../../Componentes/TodosLosTrabajos/PuestoAdminView/JobDescriptionAdminView";
import { useAuth0 } from "@auth0/auth0-react";
import { closeSession } from "../../../../helpers/CloseSession";

const cookies = new Cookies();
function PuestoAdminView() {

  const { logout } = useAuth0();

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
      closeSession();
      logout();
    }
  });
  return (
    <React.Fragment>
      <AdminNav />
      {AllAJobData &&
        <JobDescriptionAdminView
          datos={AllAJobData}
          PartnerId={PartnerId}
        />
      }
    </React.Fragment>
  );
}


export { PuestoAdminView };