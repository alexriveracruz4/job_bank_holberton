import React, { useEffect, useState } from 'react'
import './MisPuestosDeTrabajo.css';

import { ListJobs } from "../../Componentes/MisPuestosDeTrabajo/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/MisPuestosDeTrabajo/ItemJob/ItemJob";
import NavPuesto from "../../Componentes/MisPuestosDeTrabajo/Navegador/EmpresaNav";
import Data from "../../data/MispuestosEmpresa.json";
const datos = Data;

function MisPuestosDeTrabajo() {

  const PartnerId = 2;
  const [AllMyJobs, setAllMyJobs] = useState([2]);

  useEffect(async() => {
    await obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/v1/partners/${PartnerId}/jobs/`);
    const jobs = await data.json();
    setAllMyJobs(jobs);
  }


  return (
    <div className='MisPuestosDeTrabajoContainer'>
      <div className='HeaderContainer'>
        <NavPuesto />
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
            />
            ))}
          </ListJobs>
        </div>
      </div>
    </div>
  );
}

export { MisPuestosDeTrabajo };