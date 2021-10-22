import React from 'react'
import './MisPuestosDeTrabajo.css';

import { ListJobs } from "../../Componentes/MisPuestosDeTrabajo/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/MisPuestosDeTrabajo/ItemJob/ItemJob";
import NavPuesto from "../../Componentes/MisPuestosDeTrabajo/Navegador/NavPuesto";
import Data from "../../data/MispuestosEmpresa.json";

const datos = Data;

function MisPuestosDeTrabajo() {
  return (
    <div className='PuestosDeTrabajoEstudianteContainer'>
      <div className='HeaderContainer'>
        <NavPuesto />
      </div>
      <div className='BodyContainer'>
        <div className='FiltersContainer'> 
          
        </div>
        <div className='JobsContainer'> 
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