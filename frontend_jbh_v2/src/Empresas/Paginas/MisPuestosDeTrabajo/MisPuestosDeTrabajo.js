import React, { useEffect, useState } from 'react'
import './MisPuestosDeTrabajo.css';
import { EmpresaNav } from '../../Navegador/EmpresaNav';

import { ListJobs } from "../../Componentes/MisPuestosDeTrabajo/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/MisPuestosDeTrabajo/ItemJob/ItemJob";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
function MisPuestosDeTrabajo() {

  const PartnerId= cookies.get("id"); //string variable
  const [AllMyJobs, setAllMyJobs] = useState([2]);


  useEffect(async() => {
    await obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/v1/partners/${PartnerId}/jobs/`);
    const jobs = await data.json();
    setAllMyJobs(jobs);
  }

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
