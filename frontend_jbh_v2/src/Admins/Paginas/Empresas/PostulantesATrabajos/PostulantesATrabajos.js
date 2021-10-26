import React, { useEffect } from 'react';
import { AdminNav } from "../../../Navegador/AdminNav";
import TablaPostulantesATrabajos from '../../../Componentes/Empresas/PostulantesATrabajos/TablaPostulantesATrabajos/TablaPostulantesATrabajos';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

function PostulantesATrabajos() {

  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/admin";
      }
  });

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
