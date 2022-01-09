import React, { useEffect, useState } from 'react'
import './Postulantes.css';
import { EmpresaNav } from '../../Navegador/EmpresaNav';

import { ListJobs } from "../../Componentes/Postulantes/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/Postulantes/ItemJob/ItemJob";

import { useLocation, useParams } from 'react-router';
import Cookies from 'universal-cookie';

import apiPath from '../../../ApiPath';
import { helpHttp } from '../../../helpers/helpHttp';
import Loader from '../../../helpers/Loader';
import Message from '../../../helpers/Message';


// Get the data of all applicants for a job
const cookies = new Cookies();
function Postulantes(props) {
  const { JobId } = useParams();
  const partner_id= cookies.get("id"); //string variable
  const location = useLocation();
  const titleJob = location.state.titleJob;

  const [AllStudentsApplicated, setAllStudentsApplicated] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();

  React.useEffect(() => {
    const obtenerDatosDeEstudiantes = async () => {
      const url = `${apiPath}/jobs/${partner_id}/${JobId}/students`
      setLoading(true);
      api.get(url).then((res) => {
        if (!res.err) {
          setAllStudentsApplicated(res);
          setError(null)
        } else {
          setAllStudentsApplicated(null);
          setError(res);
        }
        setLoading(false);
      })
    };
    obtenerDatosDeEstudiantes();
  }, []);


  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/empresa";
      }
  });

  return (
    <div className='PostulantesContainer'>
      <div className='HeadersContainer'>
        <EmpresaNav />
      </div>
      <div className='PTitleContainer'>
        <h2>{titleJob}</h2>
        <h3>Postulantes:</h3>
        {loading && <Loader/>}
      </div>
      
      {error && <Message/>}
      {(AllStudentsApplicated) &&
        <ListJobs>
          {AllStudentsApplicated.map(estudiante => (
            <ItemJob 
              key={estudiante.token}
              id={estudiante.id}
              firstname={estudiante.firstname}
              lastname={estudiante.lastname}
              age={estudiante.age}
              email={estudiante.email}
              availability={estudiante.availability}
              linkedin={estudiante.linkedin}
              github={estudiante.github}
              twitter={estudiante.twitter}
              disp_travel={estudiante.disp_travel}
              description={estudiante.description}
              nationality={estudiante.nationality}
              phonenumber={estudiante.phonenumber}
              photo_filename_logical={estudiante.photo_filename_logical}
              pres_or_remot={estudiante.pres_or_remot}
              deleted={estudiante.deleted}
	            cv_filename_logical={estudiante.cv_filename_logical}
            />
          ))}
        </ListJobs>
      }
    </div>
  );
}

export { Postulantes };
