import React from 'react';

import { AdminNav } from "../../../Navegador/AdminNav";

import TablaPostulantesATrabajos from '../../../Componentes/Empresas/PostulantesATrabajos/TablaPostulantesATrabajos/TablaPostulantesATrabajos';

function PostulantesATrabajos() {
  return (
    <div className='PostulantesATrabajosContainer'>
      <div className='HeaderContainer'>
        <AdminNav />
      </div>
      <div className='TablaPostulantesATrabajosContainer'>
        <TablaPostulantesATrabajos />
      </div>
    </div>
  );
}

export { PostulantesATrabajos } ;