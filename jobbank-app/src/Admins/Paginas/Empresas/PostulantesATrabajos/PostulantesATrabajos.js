import React, { useEffect } from 'react';
import { AdminNav } from "../../../Navegador/AdminNav";
import TablaPostulantesATrabajos from '../../../Componentes/Empresas/PostulantesATrabajos/TablaPostulantesATrabajos/TablaPostulantesATrabajos';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

function PostulantesATrabajos() {

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('admin_id')){
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
