import React, { useEffect, useState } from "react";
import { EstudianteNav } from '../../Navegador/EstudianteNav'
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import apiPath from "../../../ApiPath";
import { useLocation } from "react-router-dom";
import { helpHttp } from "../../../helpers/helpHttp";
import { JobDescriptionStudentView } from "../../Componentes/PuestoStdView/JobDescriptionStudentView";
import { useAuth0 } from "@auth0/auth0-react";
import { closeSession } from "../../../helpers/CloseSession";


const cookies = new Cookies();
function Puesto() {

  const { logout } = useAuth0();

  // Get data to use in the component
  const { PartnerId, JobId } = useParams();
  const [JobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let location = useLocation();
  let EstadoDePostulacion = location.state.EstadoDePostulacion;
  let DatosEmpresa = location.state.DatosEmpresa;

  let api = helpHttp();

  useEffect(() => {
    const obtenerJobDatos = async () => {
      window.scrollTo(0, 0);
      const url = `${apiPath}/partners/${PartnerId}/jobs/${JobId}`;
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

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('student_id')){
        closeSession();
        logout();
      }
  });

  return (
    <React.Fragment>
        <EstudianteNav />
        {JobData &&
        <JobDescriptionStudentView
          datos={JobData}
          DatosEmpresa={DatosEmpresa}
          EstadoDePostulacion={EstadoDePostulacion}
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
            JobData = {JobData}
            PartnerName={DatosEmpresa.name}
            PartnerEmail={DatosEmpresa.email}
            logo={DatosEmpresa.logo_filename_logical}
            EstadoDePostulacion={EstadoDePostulacion}
          />
        }
        {JobData &&
          <PuestoInfo 
            JobData = {JobData}
          />
        }
*/
export { Puesto };
