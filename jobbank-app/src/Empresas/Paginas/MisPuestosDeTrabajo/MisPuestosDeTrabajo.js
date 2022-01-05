import React, { useEffect, useState } from 'react'
import './MisPuestosDeTrabajo.css';
import { EmpresaNav } from '../../Navegador/EmpresaNav';
import { ListJobs } from "../../Componentes/MisPuestosDeTrabajo/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/MisPuestosDeTrabajo/ItemJob/ItemJob";
import Cookies from 'universal-cookie';
import apiPath from '../../../ApiPath';

const cookies = new Cookies();
function MisPuestosDeTrabajo() {

  
  const PartnerId= cookies.get("id"); //string variable
  const [AllMyJobs, setAllMyJobs] = useState([2]);

  // Gets the Jobs data and saves it in AllmyJobs
  useEffect(async() => {
    await obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`${apiPath}/partners/${PartnerId}/jobs/`);
    const jobs = await data.json();
    setAllMyJobs(jobs);
  }

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/empresa";
      }
  });

  return (
    <div className='MisPuestosDeTrabajoContainer'>
      <div className='HeaderContainer'>
        <EmpresaNav />
      </div>
      <div className='MPDTBodyContainer'>
        <div className='MPDTFiltersContainer'> 
          
        </div>
        <div className='MPDTJobsContainer'> 
          <ListJobs>
            {AllMyJobs.map(trabajo => (
            <ItemJob 
              key={trabajo.token}
              JobId={trabajo.id}
              title={trabajo.title}
              deleted={trabajo.deleted}
              created_at={trabajo.created_at}
              deleted_at={trabajo.deleted_at}
            />
            ))}
          </ListJobs>
        </div>
      </div>
    </div>
  );
}

export { MisPuestosDeTrabajo };
