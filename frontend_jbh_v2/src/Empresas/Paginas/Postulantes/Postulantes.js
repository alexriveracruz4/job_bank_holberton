import React from 'react'
import './Postulantes.css';

import { ListJobs } from "../../Componentes/Postulantes/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/Postulantes/ItemJob/ItemJob";
import NavPuesto from "../../Componentes/Postulantes/Navegador/EmpresaNav";
import Data from "../../data/MispuestosEmpresa.json";

const datos = Data;

function Postulantes() {



  return (
    <div className='PostulantesContainer'>
      <div className='HeadersContainer'>
      <NavPuesto />
      </div>
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
  );
}

export { Postulantes };