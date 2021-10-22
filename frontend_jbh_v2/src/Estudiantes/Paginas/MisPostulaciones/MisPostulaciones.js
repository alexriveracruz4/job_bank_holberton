import React, { useState } from 'react'
import './MisPostulaciones.css';

import { ListJobs } from "../../Componentes/MisPostulaciones/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/MisPostulaciones/ItemJob/ItemJob";
import NavPuesto from "../../Componentes/MisPostulaciones/Navegador/NavPuesto";
import Data from "../../data/postulacionesEstudiante.json";

const datos = Data;

function MisPostulaciones() {

  const user_id = 1;
  const [AllMyApplications, setAllMyApplications] = React.useState([]);

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/v1/students/${user_id}/applications`);
    const applications = await data.json();
    setAllMyApplications(applications);
  }
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
            {AllMyApplications.map(trabajo => (
            <ItemJob 
              key={trabajo.title}
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