import React, { useEffect, useState } from 'react'
import './Postulantes.css';
import { EmpresaNav } from '../../Navegador/EmpresaNav';

import { ListJobs } from "../../Componentes/Postulantes/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/Postulantes/ItemJob/ItemJob";

import { useLocation, useParams } from 'react-router';
import Cookies from 'universal-cookie';

import apiPath from '../../../ApiPath';


const cookies = new Cookies();
function Postulantes(props) {
  const { JobId } = useParams();
  const partner_id= cookies.get("id"); //string variable
  const location = useLocation();
  const titleJob = location.state.titleJob;
  const [AllStudentsApplicated, setAllStudentsApplicated] = useState([2]);

  React.useEffect(() => {
    obtenerDatosDeEstudiantes();
  }, []);

  const obtenerDatosDeEstudiantes = async () => {
    const data = await fetch(`${apiPath}/jobs/${partner_id}/${JobId}/students`);
    const applications = await data.json();
    setAllStudentsApplicated(applications);
  }

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
      </div>
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
            pres_or_remot={estudiante.pres_or_remot}
            deleted={estudiante.deleted}
	          cv_filename_logical={estudiante.cv_filename_logical}
          />
        ))}
      </ListJobs>
    </div>
  );
}

export { Postulantes };
