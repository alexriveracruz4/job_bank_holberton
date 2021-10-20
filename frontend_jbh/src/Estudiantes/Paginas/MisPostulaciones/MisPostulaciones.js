import React from 'react'
import './MisPostulaciones.css';

import { ListJobs } from "../../Componentes/MisPostulaciones/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/MisPostulaciones/ItemJob/ItemJob";
import NavPuesto from "../../Componentes/MisPostulaciones/Navegador/NavPuesto";
import Data from "../../data/postulacionesEstudiante.json";

const datos = Data;

function MisPostulaciones() {
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