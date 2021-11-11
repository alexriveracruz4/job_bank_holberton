import React, { useEffect } from 'react'
import './MisPostulaciones.css';
import { EstudianteNav } from '../../Navegador/EstudianteNav'
import { ListJobs } from "../../Componentes/MisPostulaciones/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/MisPostulaciones/ItemJob/ItemJob";
import Cookies from 'universal-cookie';
import apiPath from '../../../ApiPath';


const cookies = new Cookies();

function MisPostulaciones() {
  // Obtains the data of the jobs to which the student has applied and saves them in AllMyApplications
  const user_id = cookies.get("id");
  const [AllMyApplications, setAllMyApplications] = React.useState([]);

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`${apiPath}/students/${user_id}/applications`);
    const applications = await data.json();
    setAllMyApplications(applications);
  }

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/estudiante";
      }
  });

  return (
    <div className='MisPostulacionesContainer'>
      <div className='HeaderContainer'>
        <EstudianteNav />
      </div>
      <div className='MPBodyContainer'>
        <div className='MPFiltersContainer'>
        </div>
        <div className='MPJobsContainer'>
          <ListJobs>
            {AllMyApplications.length === 1?
              <h2 className="NumeroDeEmpleos">HAS POSTULADO A UN EMPLEO</h2>
            :
              <h2 className="NumeroDeEmpleos">HAS POSTULADO A {AllMyApplications.length} EMPLEOS</h2> 
            }
            {AllMyApplications.map(trabajo => (
            <ItemJob
              key={trabajo.description}
              id_job={trabajo.id}
              id_empresa={trabajo.partner_id}
              title={trabajo.title}
              description={trabajo.description}
              city={trabajo.city}
              experience={trabajo.experience}
              deleted={trabajo.deleted}
            />
            ))}
          </ListJobs>
        </div>
      </div>
    </div>
  );
}

export { MisPostulaciones };
