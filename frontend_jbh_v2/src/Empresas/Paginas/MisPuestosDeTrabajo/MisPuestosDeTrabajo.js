import React from 'react'
import './MisPuestosDeTrabajo.css';

import { ListJobs } from "../../Componentes/MisPuestosDeTrabajo/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/MisPuestosDeTrabajo/ItemJob/ItemJob";
import NavPuesto from "../../Componentes/MisPuestosDeTrabajo/Navegador/EmpresaNav";
import Data from "../../data/MispuestosEmpresa.json";

const datos = Data;

function MisPuestosDeTrabajo() {
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
            {datos.map(trabajo => (
            <ItemJob 
              key={trabajo.id}
              id={trabajo.id}
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