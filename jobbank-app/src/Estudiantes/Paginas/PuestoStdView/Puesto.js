import React, { useEffect, useState } from "react";
import { EstudianteNav } from '../../Navegador/EstudianteNav'
import PuestoInfo from "../../Componentes/PuestoStdView/PuestoInfo/PuestoInfo";
import PartnerInfo from "../../Componentes/PuestoStdView/PartnerInfo/PartnerInfo";
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import apiPath from "../../../ApiPath";
import { BackButton } from "../../../helpers/BackButton";
import { useLocation } from "react-router-dom";
import { helpHttp } from "../../../helpers/helpHttp";
import Loader from "../../../helpers/Loader";
import Message from "../../../helpers/Message";



const cookies = new Cookies();
function Puesto() {
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
      if (!cookies.get('id')){
          window.location.href="/login/estudiante";
      }
  });

  return (
    <React.Fragment>
        <EstudianteNav />
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
    </React.Fragment>
  );
}
export { Puesto };
